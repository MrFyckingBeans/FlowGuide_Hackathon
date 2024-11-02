import { fetchManualWithSteps } from "@/services/manualService";
import UserGuide from "./UserGuide";

export default async function ManualView({ params }: { params: { manualID: string } }) {

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
      stepNumber: step.step_number,
      description: step.description,
      imageUrl: step.image ? step.image.image_url : null,
    };
  });




  return (
    <div>
      <UserGuide steps={stepsArray.sort((a: any, b: any) => a.stepNumber - b.stepNumber)} />
    </div>
  );
}
