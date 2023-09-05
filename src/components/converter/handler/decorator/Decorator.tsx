import { type ReactNode } from "react";
import useConversion from "../../../../hooks/useConversion";
import GoogleDecorator from "./google-calendar-decorator/GoogleDecorator";
import SheetDecorator from "./sheet-decorator/SheetDecorator";
import { Icon } from "@iconify/react";

export default function Decorator() {
  const { conversion } = useConversion();

  if (!conversion?.format) {
    return <></>;
  }

  if (conversion.format.type === "google-calendar") {
    return (
      <Wrapper>
        <GoogleDecorator />
      </Wrapper>
    );
  }

  if (conversion.format.type === "xlsx") {
    return (
      <Wrapper>
        <SheetDecorator />
      </Wrapper>
    );
  }

  return <></>;
}

function Wrapper({ children }: { children: ReactNode | ReactNode[] }) {
  const { conversion, updateConversion } = useConversion();

  if (!conversion || !updateConversion || !conversion.format) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div>
        <span className="text-lg font-bold italic">Tùy chỉnh...</span>
      </div>
      {children}
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
          disabled={conversion.format.decoration === null}
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
    </div>
  );
}
