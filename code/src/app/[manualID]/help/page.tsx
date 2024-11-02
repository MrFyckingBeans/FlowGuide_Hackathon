// src/app/[manualID]/help/page.tsx

import Help from "./Help";
import { generateTextFromImage, pushImageToBucket } from "./helper";

export default async function ManualHelp({ params }: { params: { manualID: string } }) {




  const uploadImage = async (formData: FormData): Promise<string> => {
    "use server"

    console.log("uploadImage")
    const file = formData.get("file") as File;
    const url = await pushImageToBucket(file)
    console.log(url)
    const text = await generateTextFromImage(url)
    console.log(text)
    return text;

  }

  return (
    <Help uploadImage={uploadImage} />
  );
}
