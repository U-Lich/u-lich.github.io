import { Icon } from "@iconify/react";
import useConversion from "../../../../../hooks/useConversion";
import { useMemo } from "react";
import { ColorMap } from "../../../../../objects/conversion/decoration/ConversionDecoration";

export default function GoogleDecorator() {
  const { conversion, updateConversion } = useConversion();
  const colorMap = useMemo(() => {
    if (!conversion?.format?.decoration) return {} as ColorMap;

    if (
      conversion.format.decoration.type !== "calendar" ||
      conversion.format.decoration.preset === "monochrome"
    )
      return {} as ColorMap;

    return conversion.format.decoration.colorMap;
  }, [conversion]);

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="">
      <button
        className="flex w-full flex-row items-center justify-center gap-2 rounded-xl px-4 py-2 shadow-xl shadow-blue-100 transition-shadow hover:shadow-lg hover:shadow-blue-200 focus:shadow-none active:shadow-none"
        onClick={() => {
          console.log(colorMap);
        }}
      >
        <Icon icon="fluent-emoji:floppy-disk" width="24px" />
        <span className="font-semibold">Lưu</span>
      </button>
    </div>
  );
}
