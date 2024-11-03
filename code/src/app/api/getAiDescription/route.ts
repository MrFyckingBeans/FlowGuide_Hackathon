import { addGuidToDatabase } from "@/services/addGuidToDatabase";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const response = await req.json();
        console.log("Images: ", response);

        const content = [
            {
                type: "text",
                text: `Please create a structured, step-by-step guide based on the provided images, ordered sequentially. Each step should contain a title, description.
                The steps should focus on generating a user-friendly guide. Give me the url of the image for each step (so on which url the step is based).
                these are the urls: ${response.images.join(", ")}urlresponse.images.join(", ")`,
            },
            ...response.images.map((url: string) => ({
                type: "image",
                image: new URL(url),
            })),
        ];

        const { object } = await generateObject({
            model: openai("gpt-4-turbo"),
            maxTokens: 512,
            schema: z.object({
                steps: z.array(
                    z.object({
                        title: z.string(),
                        description: z.string(),
                        ImageURL: z.string().url(),
                    })
                ),
            }),
            messages: [
                {
                    role: "user",
                    content,
                },
            ],
        });

        if (!object) {
            return NextResponse.json({ error: "Failed to generate guide object" }, { status: 500 });
        }


        // Prepare steps data to be saved in the database
        const stepsData = object.steps.map(step => ({
            title: step.title,
            description: step.description,
            url : step.ImageURL,
        }));

        await addGuidToDatabase(response.deviceName, response.description, stepsData);

        return NextResponse.json(object);
    } catch (error: any) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
