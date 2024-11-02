// src/app/[manualID]/help/page.tsx

import Help from "./Help";
import { pushImageToBucket } from "./helper";

export default async function ManualHelp({ params }: { params: { manualID: string } }) {




  const uploadImage = async (formData: FormData) => {
    "use server"

    console.log("uploadImage")
    const file = formData.get("file") as File;
    const url = await pushImageToBucket(file)
    console.log(url)

  }

  return (
    <Help uploadImage={uploadImage} />
  );
}
