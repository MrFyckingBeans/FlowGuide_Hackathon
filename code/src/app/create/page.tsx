// src/app/create/page.tsx
import ClientComponent from "./clientComponent";
import { Suspense } from "react";

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  );
}
