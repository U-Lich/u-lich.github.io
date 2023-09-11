import {
  DecorationParams,
  SheetDecoration,
} from "@/objects/conversion/decoration/sheet-decoration/SheetDecoration";
import { Row, Style } from "exceljs";
import hexRGBToARGB from "../../libs/hexRGBToARGB";

/**
 * Decorates the header row
 * @param row The exceljs row object
 * @param decoration The sheet decoration object
 */
export default function decorate(row: Row, decoration: SheetDecoration) {
  const borderColor = {
    argb: hexRGBToARGB(decoration.params.get(DecorationParams.BORDER_COLOR)!),
  };

  const style: Style = {
    numFmt: row.numFmt, // copy default row number formatting
    protection: { locked: false },
    font: {
      name: "Calibri",
      family: 2,
      bold: true,
      size: 12,
      color: {
        argb: hexRGBToARGB(
          decoration.params.get(DecorationParams.HEADER_FONT_COLOR)!,
        ),
      },
    },

    alignment: {
      vertical: "middle",
      horizontal: "center",
    },

    border: {
      top: {
        style: "thin",
        color: borderColor,
      },
      left: {
        style: "thin",
        color: borderColor,
      },
      bottom: {
        style: "thin",
        color: borderColor,
      },
      right: {
        style: "thin",
        color: borderColor,
      },
    },

    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: hexRGBToARGB(
          decoration.params.get(DecorationParams.HEADER_COLOR)!,
        ),
      },
    },
  };
  row.getCell(1).style = style;
  row.getCell(2).style = style;
  row.getCell(3).style = style;
  row.getCell(4).style = style;
  row.getCell(5).style = style;
  row.getCell(6).style = style;
}
