import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { fetchManualWithSteps } from "@/services/manualService";
import { Step } from "@/types";

export const pushImageToBucket = async (file: File) => {
    const { name, lastModified } = file;
    const { data, error } = await supabase.storage
        .from("feedback_images")
        .upload(`${lastModified}_${name}`, file, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/*",
        })

    const url = supabase.storage.from("feedback_images").getPublicUrl(`${lastModified}_${name}`).data.publicUrl;

    return url;
}

const getGuideText = async (manualID: string) => {
    const manual = await fetchManualWithSteps(manualID)
    return manual?.steps.map((step: Step) => step.description).join("\n")
}

export const generateTextFromImage = async (url: string, manualID: string) => {
    const guideText = await getGuideText(manualID)
    const result = await generateText({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'Please provide troubleshooting steps for this image (no more than 3 sentences) Find the guide text below:\n' + guideText,
                    },
                    {
                        type: 'image',
                        image: new URL(url,
                        ),
                    },
                ],
            },
        ],
    });

    return result.text;
}


export const generateTextFromMessages = async (messages: { role: string, content: string }[], manualID: string) => {
    const guideText = await getGuideText(manualID)
    const initialMessages = [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: 'Please provide troubleshooting steps for this image (no more than 3 sentences) Find the guide text below:\n' + guideText,
                },
                {
                    type: 'image',
                    image: new URL(messages[0].content),
                },
            ],
        },
    ]

    Array.prototype.push.apply(initialMessages, messages.map((message) => ({
        role: message.role,
        content: [
            {
                type: 'text',
                text: message.content,
            }
        ],
    })).slice(1))

    console.log(initialMessages)

    const result = await generateText({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        messages: initialMessages as any,
    });
    return result.text;
}

