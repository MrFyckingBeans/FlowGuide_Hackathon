// src/app/[manualID]/help/page.tsx

import { fetchManualWithSteps } from "@/services/manualService";
import Help from "./Help";

export default async function ManualHelp({ params }: { params: { manualID: string } }) {

  return (
    <Help />
  );
}
