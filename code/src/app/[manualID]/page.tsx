import UserGuide from "./UserGuide";

export default function ManualView({ params }: { params: { manualID: string } }) {

  return (
    <div>
      <h1>Manual ID: {params.manualID}</h1>
      <UserGuide />
    </div>
  );
}
