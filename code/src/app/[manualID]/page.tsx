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

  return (
    <div>
      <UserGuide steps={manual.steps.sort((a: any, b: any) => a.step_number - b.step_number)} />
    </div>
  );
}
