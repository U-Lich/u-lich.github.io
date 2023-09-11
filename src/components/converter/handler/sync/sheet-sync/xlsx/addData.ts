import * as DataHandler from "./schedule";

import { Worksheet } from "exceljs";
import { Schedule, Subject } from "@/objects/schedule/Schedule";
import { DOW } from "@/objects/dow/DOW";
import { SheetDecoration } from "@/objects/conversion/decoration/sheet-decoration/SheetDecoration";
import { byDOW, byPeriods, byWeeks } from "./libs/subjectBy";

const dowToColumn: {
  [key in DOW]?: number;
} = {
  [DOW.MONDAY]: 2,
  [DOW.TUESDAY]: 3,
  [DOW.WEDNESDAY]: 4,
  [DOW.THURSDAY]: 5,
  [DOW.FRIDAY]: 6,
};

export default function addData(
  worksheet: Worksheet,
  schedule: Schedule,
  decoration: SheetDecoration,
) {
  // get periods range
  const { min, max } = getPeriodRange(schedule.subjects);

  // get furthest week
  const furthestWeek = getFurthestWeek(schedule.subjects);

  let currentRow = 1;
  const subjectsByWeeks = byWeeks(schedule.subjects);

  for (let week = 1; week <= furthestWeek; week++) {
    const weekRow = worksheet.getRow(currentRow);
    DataHandler.Title.add(week, weekRow, schedule, 6);
    DataHandler.Title.decorate(weekRow, decoration);

    const headerRow = worksheet.getRow(currentRow + 1);
    DataHandler.Header.add(headerRow);
    DataHandler.Header.decorate(headerRow, decoration);

    currentRow = currentRow + 2;

    const subjectsByPeriods = subjectsByWeeks.has(week)
      ? byPeriods(subjectsByWeeks.get(week)!)
      : undefined;

    // write data row
    for (let period = min; period <= max; period++) {
      const dataRow = worksheet.getRow(currentRow + period - min);

      const periodCell = dataRow.getCell(1);
      DataHandler.Period.add(periodCell, period);
      DataHandler.Period.decorate(periodCell, decoration);

      const subjectsByDOW = subjectsByPeriods?.has(period)
        ? byDOW(subjectsByPeriods.get(period)!)
        : undefined;

      for (const [dow, column] of Object.entries(dowToColumn)) {
        const cell = dataRow.getCell(column);

        if (!subjectsByDOW?.has(dow as DOW)) {
          DataHandler.Subject.addEmpty(cell);
          DataHandler.Subject.decorate(cell, decoration);
          continue;
        }

        const subject = subjectsByDOW.get(dow as DOW)!;
        DataHandler.Subject.add(cell, subject[0]);
        DataHandler.Subject.decorate(cell, decoration);
      }
    }

    // update current row
    currentRow = currentRow + max - min + 1;

    // insert print break
    worksheet.getRow(currentRow - 1).addPageBreak();
  }

  worksheet.columns[0].width = 10;
}

function getPeriodRange(subjects: Subject[]) {
  let min = Infinity;
  let max = -Infinity;

  for (const subject of subjects) {
    const periods = subject.periods;
    for (const period of periods) {
      if (period < min) {
        min = period;
      }

      if (period > max) {
        max = period;
      }
    }
  }

  return { min, max };
}

function getFurthestWeek(subjects: Subject[]) {
  let max = -Infinity;

  for (const subject of subjects) {
    const weeks = subject.weeks;
    for (const week of weeks) {
      if (week > max) {
        max = week;
      }
    }
  }

  return max;
}
