import {
  DecorationParams,
  SheetDecoration,
} from "@/objects/conversion/decoration/sheet-decoration/SheetDecoration";
import { Cell } from "exceljs";
import hexRGBToARGB from "../../libs/hexRGBToARGB";

/**
 * Adds the subtitle row to the exceljs row object
 * @param cell The exceljs cell object
 * @param decoration The decoration
 */
export default function decorate(cell: Cell, decoration: SheetDecoration) {
  const borderColor = {
    argb: hexRGBToARGB(decoration.params.get(DecorationParams.BORDER_COLOR)!),
  };

  cell.font = {
    name: "Calibri",
    family: 2,
    bold: false,
    size: 10,
    color: {
      argb: hexRGBToARGB(
        decoration.params.get(DecorationParams.BODY_FONT_COLOR)!,
      ),
    },
  };

  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
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
      argb: hexRGBToARGB(decoration.params.get(DecorationParams.BODY_COLOR)!),
    },
  };
}
