import { Cell } from "exceljs";

/**
 * Adds the subtitle row to the exceljs row object
 * @param cell The exceljs cell object
 * @param period The period
 */
export default function add(cell: Cell, period: number) {
  cell.value = Math.floor(period);
}
