import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        // Parse the request body to get image URLs
        const response = await req.json();

        console.log("Images asdfölkasdjf:", response);
        // Format each image URL as a message for the AI model
        const content = [
            {
                type: "text",
                text: "From the images I have provided, can you create a step-by-step guide? The images are in order. Only include things you see in the pictures.",
            },
            // {
            //     type: "text",
            //     text: images.NameOfDevice,
            // },
            // {
            //     type: "text",
            //     text: images.Description,
            // },
            ...response.images.map((url: string) => ({
                type: "image",
                image: new URL(url),
            })),
        ];

        // Pass the structured content as a single message
        const { object } = await generateObject({
            model: openai("gpt-4-turbo"),
            maxTokens: 512,
            schema: z.object({
                stamps: z.array(
                    z.object({
                        TitleOfStep: z.string(),
                        description: z.string(),
                        imageurl: z.string().optional(),
                    })
                ),
            }),
            messages: [
                {
                    role: "user",
                    content,  // Wrap `content` in a single message
                },
            ],
        });

        // Check if the object was successfully generated
        if (!object) {
            return NextResponse.json({ error: "Failed to generate object" }, { status: 500 });
        }

        return NextResponse.json(object);
    } catch (error: any) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
