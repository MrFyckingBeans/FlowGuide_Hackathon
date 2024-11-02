import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
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
                content: [
                    {
                        type: "text",
                        text: "From the images I have provided, can you create a step by step guide. The images are in order. Only include things you see on the pictures",
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/1.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/2.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/3.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/4.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/5.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/6.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https:///hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/7.jpeg"
                        ),
                    },
                    {
                        type: "image",
                        image: new URL(
                            "https://hgslpyhghpqsouzsavjb.supabase.co/storage/v1/object/public/step_images/guides/8.jpeg"
                        ),
                    }
                ],
            },
        ],
    });

    console.log(object);
    return Response.json({ object });
}