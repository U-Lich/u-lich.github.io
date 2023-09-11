import ConversionState from "@/objects/conversion/state/ConversionState";
import useConversion from "../../../hooks/useConversion";

const StateToPercent: { [key in ConversionState]: number } = {
  [ConversionState.OBJECT]: 0,
  [ConversionState.FORMAT]: 30,
  [ConversionState.DECORATION]: 70,
  [ConversionState.SYNCED]: 100,
};

export default function ProgressIndicator() {
  const { conversion } = useConversion();

  if (!conversion) {
    return <></>;
  }

  return (
    <div
      className={`relative h-2 w-2/3 overflow-hidden rounded-full bg-gray-200 transition-opacity ${
        conversion.state === "OBJECT" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute left-0 top-1/2 h-full w-full -translate-y-1/2 bg-blue-400 transition-all duration-500"
        style={{
          width: `${StateToPercent[conversion.state]}%`,
        }}
      />
    </div>
  );
}
