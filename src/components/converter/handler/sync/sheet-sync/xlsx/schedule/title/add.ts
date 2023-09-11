import { Schedule } from "@/objects/schedule/Schedule";
import { Row } from "exceljs";

/**
 * Adds the subtitle row to the exceljs row object
 * @param week The week number
 * @param row The exceljs row object
 * @param schedule The schedule object
 * @param width The width of the title row, used to merge cells
 */
export default function add(
  week: number,
  row: Row,
  schedule: Schedule,
  width = 1,
) {
  const cell = row.getCell(1);
  cell.value = `Lớp ${schedule.class}. Học kỳ ${
    schedule.season.semester
  }. Năm học ${schedule.season.year[0]}-${
    schedule.season.year[1]
  }. Tuần ${week}. Ngày ${new Date(
    schedule.start.getTime() + 7 * 24 * 60 * 60 * 1000 * (week - 1),
  ).toLocaleDateString("vi-VN")}`;

  if (width > 1) {
    row.worksheet.mergeCells(
      cell.fullAddress.row,
      cell.fullAddress.col,
      cell.fullAddress.row,
      cell.fullAddress.col + width - 1,
    );
  }
}
