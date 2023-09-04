import { Icon } from "@iconify/react/dist/iconify.js";
import useConversion from "../../../../../hooks/useConversion";

export default function GoogleDecorator() {
  const { conversion, updateConversion } = useConversion();

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="flex flex-row justify-between self-stretch">
      <button
        className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => {
          updateConversion({
            type: "SWITCH_STATE",
            state: "FORMAT",
          });
        }}
      >
        <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
          <Icon icon="fluent-emoji:left-arrow" width="24px" />
        </div>
      </button>
      <button
        disabled={conversion.format === null}
        className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => {
          updateConversion({
            type: "SWITCH_STATE",
            state: "SYNCED",
          });
        }}
      >
        <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
          <Icon icon="fluent-emoji:right-arrow" width="24px" />
        </div>
      </button>
    </div>
  );
}
