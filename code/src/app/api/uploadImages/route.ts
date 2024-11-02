import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ImageData {
    name: string;
    fileData: string;
}
export async function POST(req: Request) {
    try {
        console.log("Processing POST request");
        
        const { images } = await req.json();
        const uploadPromises = images.map((image: { name: string; fileData: string }, index: number) => {
            const { name, fileData } = image;
            const fileBuffer = Buffer.from(fileData, "base64");

            return supabase.storage
                .from("step_images")
                .upload(`guides/${index}_${name}`, fileBuffer, {
                    cacheControl: "3600",
                    upsert: true,
                    contentType: "image/jpeg",
                })
                .then(({ data, error }) => {
                    if (error) {
                        throw error;
                    }
                    return {
                        name,
                        url: supabase.storage.from("step_images").getPublicUrl(`guides/${index}_${name}`).data.publicUrl,
                    };
                });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        return NextResponse.json(uploadedImages);
    } catch (error: any) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
