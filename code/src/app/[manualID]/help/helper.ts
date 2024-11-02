import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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
