import { Workbook } from "exceljs";
import { Schedule } from "@/objects/schedule/Schedule";
import addData from "./addData";
import { SheetDecoration } from "@/objects/conversion/decoration/sheet-decoration/SheetDecoration";

export default function createXLSX(
  schedule: Schedule,
  decoration: SheetDecoration,
) {
  const workbook = new Workbook();

  workbook.creator = "U-lich";
  workbook.lastModifiedBy = "U-lich";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  const worksheet = workbook.addWorksheet("TKB", {
    pageSetup: {
      paperSize: 9,
      fitToHeight: 0,
      fitToWidth: 1,
      orientation: "landscape",
      margins: {
        top: 0.3,
        right: 0.3,
        bottom: 0.3,
        left: 0.3,
        header: 0.0,
        footer: 0.0,
      },
      verticalCentered: true,
    },
    properties: {
      defaultColWidth: 30,
      defaultRowHeight: 50,
    },
  });

  addData(worksheet, schedule, decoration);

  return workbook;
}
