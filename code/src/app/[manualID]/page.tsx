import { PrismaClient } from "@prisma/client";
import UserGuide from "./UserGuide";

export default async function ManualView({ params }: { params: { manualID: string } }) {
  const prisma = new PrismaClient()


  const manual = await prisma.manual.findUnique({
    where: {
      id: parseInt(params.manualID),
    },
    include: {
      steps: {
        include: {
          image: true, 
        },
      },
    },
  });
  
  const stepsArray = manual.steps.map((step:any) => {
    return {
      description: step.description,
      imageUrl: step.image ? step.image.image_url : null,
    };
  });

  if (!manual) {
    return <div>Manual not found</div>
  }


  return (
    <div>
      <h1>Manual ID: {params.manualID}</h1>
      <UserGuide steps={stepsArray}/>
    </div>
  );
}
