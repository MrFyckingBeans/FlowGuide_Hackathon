// src/app/[manualID]/help/page.tsx

import { addFeedbackToDatabase } from "@/services/addGuidToDatabase";
import Help from "./Help";
import { generateTextFromImage, generateTextFromMessages, pushImageToBucket } from "./helper";

export default async function ManualHelp({ params }: { params: { manualID: string } }) {




  const uploadImage = async (formData: FormData): Promise<{ text: string, url: string }> => {
    "use server"

    const file = formData.get("file") as File;
    const url = await pushImageToBucket(file)
    const text = await generateTextFromImage(url, params.manualID)
    await addFeedbackToDatabase(parseInt(params.manualID), parseInt(formData.get("step") as string), url)
    return { text: text, url: url };
  }

  const uploadText = async (messages: { role: string, content: string }[]): Promise<string> => {
    "use server"
    const text = await generateTextFromMessages(messages, params.manualID)
    return text;
  }

  return (
    <Help uploadImage={uploadImage} uploadText={uploadText} />
  );
}
