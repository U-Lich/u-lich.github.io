import useConversion from "../../../../../hooks/useConversion";
import {
  DecorationParams,
  defaultSheetDecoration,
  getDefaultSheetDecoration,
  getViParams,
  SheetDecoration,
} from "../../../../../objects/conversion/decoration/sheet-decoration/SheetDecoration";
import { useState, useMemo, useRef } from "react";
import ColorPicker, { ColorPickerRef } from "../color-picker/ColorPicker";

export default function SheetDecorator() {
  const colorPickerRef = useRef<ColorPickerRef>(null);
  const [currentColorParam, setCurrentColorParam] =
    useState<DecorationParams | null>(null);
  const { conversion, updateConversion } = useConversion();
  const decoration = useMemo(() => {
    if (!conversion?.format) {
      return null;
    }

    if (conversion.format.type !== "xlsx") {
      throw new Error("Invalid format type for sheet decoration.");
    }

    if (!conversion.format.decoration) {
      return {
        type: "sheet",
        params: getDefaultSheetDecoration(),
      } satisfies SheetDecoration;
    }

    const map = conversion.format.decoration.params;
    Object.entries(defaultSheetDecoration).forEach((entry) => {
      const [key, value] = entry;

      if (!map.has(key)) {
        map.set(key, value);
      }
    });

    return {
      type: "sheet",
      params: map,
    } satisfies SheetDecoration;
  }, [conversion]);

  if (!conversion?.format || !updateConversion || !decoration) {
    return <></>;
  }

  if (conversion.format.type !== "xlsx") {
    throw new Error("Invalid format type for sheet decoration.");
  }

  return (
    <>
      <div className="flex w-full flex-col items-stretch overflow-y-auto rounded-xl p-4 shadow-xl shadow-blue-100">
        {Object.keys(defaultSheetDecoration).map((param) => (
          <ColorParam
            key={param}
            decoration={decoration}
            param={param as DecorationParams}
            onClick={(param) => {
              setCurrentColorParam(param);
              colorPickerRef.current?.open();
            }}
          />
        ))}
      </div>
      {!currentColorParam ? (
        <></>
      ) : (
        <ColorPicker
          ref={colorPickerRef}
          color={decoration.params.get(currentColorParam)}
          onChange={(newColor) => {
            if (conversion.format?.type !== "xlsx") {
              throw new Error("Invalid format type for sheet decoration.");
            }

            const newMap = new Map(decoration.params);
            newMap.set(currentColorParam, newColor);
            updateConversion({
              type: "LOAD_FORMAT",
              format: {
                ...conversion.format,
                decoration: {
                  ...decoration,
                  params: newMap,
                },
              },
            });
          }}
        />
      )}
    </>
  );
}

function ColorParam({
  decoration,
  param,
  onClick,
}: {
  decoration: SheetDecoration;
  param: DecorationParams;
  onClick?: (param: DecorationParams, e: React.MouseEvent) => void;
}) {
  const label = getViParams(param);
  const color = decoration.params.get(param)!;

  return (
    <div className="flex flex-row items-center justify-between">
      <span>{label}</span>
      <button
        className="my-2 h-8 w-8 rounded-full shadow-xl shadow-blue-100"
        style={{
          backgroundColor: color,
        }}
        onClick={(e) => onClick?.(param, e)}
      />
    </div>
  );
}
