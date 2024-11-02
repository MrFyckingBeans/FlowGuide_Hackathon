import { deleteStep, fetchManualWithStepsWithReports } from "@/services/manualService";
import ManualOverview from "./ManualOverview";
import { revalidatePath } from "next/cache";

export default async function ManualView({ params }: { params: { manualID: string } }) {



  const manual: any = await fetchManualWithStepsWithReports(params.manualID)

  console.log(manual)

  if (!manual) {
    return <div>Manual not found</div>
  }

  const deleteManualStep = async (stepId: number) => {
    "use server"
    await deleteStep(stepId);
    revalidatePath(`/${params.manualID}/overview`)
  }


  return (
    <div>
      <ManualOverview manual={manual} deleteStep={deleteManualStep} />
    </div>
  );
}
