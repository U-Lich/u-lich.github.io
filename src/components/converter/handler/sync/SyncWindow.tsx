import { type ReactNode } from "react";
import useConversion from "../../../../hooks/useConversion";
import { Icon } from "@iconify/react/dist/iconify.js";
import SheetSyncWindow from "./sheet-sync/SheetSyncWindow";

export default function SyncWindow() {
  const { conversion } = useConversion();

  if (!conversion?.format) {
    return <></>;
  }

  if (conversion.format.type === "google-calendar") {
    return (
      <Wrapper>
        <SheetSyncWindow />
      </Wrapper>
    );
  }

  if (conversion.format.type === "xlsx") {
    return (
      <Wrapper>
        <SheetSyncWindow />
      </Wrapper>
    );
  }

  return <></>;
}

function Wrapper({ children }: { children: ReactNode | ReactNode[] }) {
  const { conversion, updateConversion } = useConversion();

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div>
        <span className="text-lg font-bold italic">Lưu...</span>
      </div>
      {children}
      <button
        // ? uncomment this to enable the button
        // disabled={conversion.text === null}

        // debugging
        disabled={false}
        className="group self-start rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => {
          updateConversion({
            type: "SWITCH_STATE",
            state: "DECORATION",
          });
        }}
      >
        <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
          <Icon icon="fluent-emoji:left-arrow" width="24px" />
        </div>
      </button>
    </div>
  );
}
