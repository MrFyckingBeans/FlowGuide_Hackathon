import { fetchManualWithSteps, updateStep } from "@/services/manualService";
import Edit from "./Edit";
import { Step } from "@/types";

export default async function ManualEdit({ params }: { params: { manualID: string } }) {
  if (isNaN(Number(params.manualID))) {
    return <div>Invalid manual ID</div>;
  }

  const manual = await fetchManualWithSteps(params.manualID);

  if (!manual) {
    return <div>Manual not found</div>;
  }

  async function changeStep(description: string, stepId: number) {
    'use server';
    await updateStep(description, stepId);
  }

  // Convert `bigint` to `number` for `id` and `manual_id`
  const stepsWithNumberId = manual.steps.map(step => ({
    ...step,
    id: Number(step.id), // Convert `id` to number
    manual_id: Number(step.manual_id), // Convert `manual_id` to number if necessary
  }));

  return (
    <Edit
      steps={stepsWithNumberId.sort((a: Step, b: Step) => a.step_number - b.step_number)}
      changeStep={changeStep}
    />
  );
}
