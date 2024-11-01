// src/app/[manualID]/report/page.tsx
export default function ManualReport({ params }: { params: { manualID: string } }) {
    return (
      <div>
        <h1>Report for Manual {params.manualID}</h1>
        <p>Report details or reporting form for manual {params.manualID} goes here.</p>
      </div>
    );
  }
  