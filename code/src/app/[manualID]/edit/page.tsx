import { fetchManualWithSteps, updateStep } from "@/services/manualService";
import Edit from "./Edit";

// src/app/[manualID]/edit/page.tsx
export default async function ManualEdit({ params }: { params: { manualID: string } }) {


  // check if the manual id is a number
  if (isNaN(Number(params.manualID))) {
    return <div>Invalid manual ID</div>
  }

  const manual = await fetchManualWithSteps(params.manualID);

  if (!manual) {
    return <div>Manual not found</div>
  }

  const stepsArray = manual.steps.map((step: any) => {
    return {
      id: step.id,
      stepNumber: step.step_number,
      description: step.description,
      imageUrl: step.image ? step.image.image_url : null,
    };
  });

  async function changeStep(description: string, stepId: number) {
    'use server'
    await updateStep(description, stepId)
  }


  return (
    <Edit steps={stepsArray.sort((a: any, b: any) => a.stepNumber - b.stepNumber)} changeStep={changeStep} />
  );
}
