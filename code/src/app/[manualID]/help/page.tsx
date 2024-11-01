// src/app/[manualID]/help/page.tsx
'use client';

export default function ManualHelp({ params }: { params: { manualID: string } }) {
    return (
      <div>
        <h1>Help for Manual {params.manualID}</h1>
        <p>Help information specific to manual {params.manualID} goes here.</p>
      </div>
    );
  }
  