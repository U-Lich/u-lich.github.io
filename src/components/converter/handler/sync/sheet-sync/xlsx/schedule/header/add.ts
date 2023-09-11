import { DOW, toVi } from "@/objects/dow/DOW";
import { Row } from "exceljs";

/**
 * Adds the header row to the exceljs row object
 * @param row The exceljs row object
 */
export default function add(row: Row) {
  row.getCell(1).value = "Tiết";
  row.getCell(2).value = toVi(DOW.MONDAY);
  row.getCell(3).value = toVi(DOW.TUESDAY);
  row.getCell(4).value = toVi(DOW.WEDNESDAY);
  row.getCell(5).value = toVi(DOW.THURSDAY);
  row.getCell(6).value = toVi(DOW.FRIDAY);
}
