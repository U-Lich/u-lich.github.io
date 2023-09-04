import { useRef, useState } from "react";
import useConversion from "../../../../hooks/useConversion";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Decorator() {
  const { conversion, updateConversion } = useConversion();
  const area = useRef<HTMLTextAreaElement>(null);

  // debug
  const [value, setValue] = useState("");

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <textarea
        ref={area}
        className="resize-none overflow-hidden rounded-xl border-none bg-white p-4 shadow-xl shadow-blue-100 outline-none transition-all placeholder:text-center hover:shadow-lg hover:shadow-blue-200 hover:outline-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black active:shadow-none"
        rows={1}
        // value={conversion.text ?? ""}
        value={value}
        placeholder="Decorator placeholder"
        onChange={() => {
          if (!area.current) {
            return;
          }

          console.log(area.current.value);
          setValue(area.current.value);
        }}
      />
      <div className="flex flex-row justify-between self-stretch">
        <button
          // ? uncomment this to enable the button
          // disabled={conversion.text === null}

          // debugging
          disabled={false}
          className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {
            updateConversion({
              type: "DEBUG_GRAPHICS",
              newState: "OBJECT",
            });
          }}
        >
          <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
            <Icon icon="fluent-emoji:left-arrow" width="24px" />
          </div>
        </button>
        <button
          // ? uncomment this to enable the button
          // disabled={conversion.text === null}

          // debugging
          disabled={false}
          className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {
            updateConversion({
              type: "DEBUG_GRAPHICS",
              newState: "FORMAT",
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
