import { Icon } from "@iconify/react";
import createXLSX from "./xlsx/createXLSX";
import useConversion from "../../../../../hooks/useConversion";

export default function SheetSyncWindow() {
  const { conversion } = useConversion();

  if (!conversion?.schedule || conversion.format?.type !== "xlsx") {
    return <></>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        className="flex flex-1 flex-row items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-xl shadow-blue-100 transition-shadow hover:shadow-lg hover:shadow-blue-200 focus:shadow-none active:shadow-none"
        title="Tải về"
        onClick={() => {
          if (
            !conversion?.schedule ||
            conversion.format?.type !== "xlsx" ||
            !conversion.format?.decoration
          ) {
            throw new Error("Invalid conversion");
          }

          const workbook = createXLSX(
            conversion.schedule,
            conversion.format.decoration,
          );
          workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "TKB.xlsx";
            a.click();
          });
        }}
      >
        <Icon icon="fluent-emoji:floppy-disk" width="24px" />
        <span className="font-bold">Tải về</span>
      </button>
    </div>
  );
}
