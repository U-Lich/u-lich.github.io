import useConversion from "../../../hooks/useConversion";

export default function ProgressIndicator() {
  const { conversion } = useConversion();

  if (!conversion) {
    return <></>;
  }

  return (
    <div className="font-bold">
      <span>{`Current step: <${conversion.state}>`}</span>
    </div>
  );
}
