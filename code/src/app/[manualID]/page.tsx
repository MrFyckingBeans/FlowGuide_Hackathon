import { useSearchParams } from 'next/navigation';

export default function ManualView({ params }: { params: { manualID: string } }) {
  const searchParams = useSearchParams();
  const stepID = searchParams.get('stepID');

  return (
    <div>
      <h1>Manual ID: {params.manualID}</h1>
      <h2>Step ID: {stepID}</h2>
      <p>This is the content for step {stepID} of manual {params.manualID}.</p>
    </div>
  );
}
