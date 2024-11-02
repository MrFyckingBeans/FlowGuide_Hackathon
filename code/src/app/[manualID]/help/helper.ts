import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

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

export const generateTextFromImage = async (url: string) => {
    const result = await generateText({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'Please provide troubleshooting steps for this image (no more than 3 sentences)',
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
