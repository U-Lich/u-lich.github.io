import { Subject } from "@/objects/schedule/Schedule";
import { Cell } from "exceljs";

/**
 * Adds the subtitle row to the exceljs row object
 * @param cell The exceljs cell object
 * @param subject The subject
 */
export default function add(cell: Cell, subject: Subject) {
  cell.value = `${subject.name} (${subject.id})`;
}

export function addEmpty(cell: Cell) {
  cell.value = "";
}
