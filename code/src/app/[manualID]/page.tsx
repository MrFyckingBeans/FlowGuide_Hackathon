import { fetchManualWithSteps } from "@/services/manualService";
import UserGuide from "./UserGuide";

export default async function ManualView({ params }: { params: { manualID: string } }) {


  const manual = await fetchManualWithSteps(params.manualID);

  if (!manual) {
    return <div>Manual not found</div>
  }

  const stepsArray = manual.steps.map((step: any) => {
    return {
      description: step.description,
      imageUrl: step.image ? step.image.image_url : null,
    };
  });




  return (
    <div>
      <h1>Manual ID: {params.manualID}</h1>
      <UserGuide steps={stepsArray} />
    </div>
  );
}
