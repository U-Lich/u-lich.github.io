import {
  DecorationParams,
  SheetDecoration,
} from "@/objects/conversion/decoration/sheet-decoration/SheetDecoration";
import { Row } from "exceljs";
import hexRGBToARGB from "../../libs/hexRGBToARGB";

/**
 * Decorates the subtitle row
 * @param row The exceljs row object
 * @param decoration The sheet decoration object
 */
export default function decorate(row: Row, decoration: SheetDecoration) {
  const cell = row.getCell(1);

  cell.font = {
    name: "Calibri",
    family: 2,
    bold: true,
    size: 12,
    color: {
      argb: hexRGBToARGB(
        decoration.params.get(DecorationParams.HEADER_FONT_COLOR)!,
      ),
    },
  };

  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  const borderColor = {
    argb: hexRGBToARGB(decoration.params.get(DecorationParams.BORDER_COLOR)!),
  };

  cell.border = {
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
  };

  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: hexRGBToARGB(decoration.params.get(DecorationParams.HEADER_COLOR)!),
    },
  };
}
