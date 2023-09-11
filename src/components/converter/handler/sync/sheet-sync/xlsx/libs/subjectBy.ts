import { DOW } from "@/objects/dow/DOW";
import { Subject } from "@/objects/schedule/Schedule";

export function byWeeks(subjects: Subject[]) {
  const dict: Map<number, Subject[]> = new Map();

  for (const subject of subjects) {
    const weeks = subject.weeks;
    for (const week of weeks) {
      if (!dict.has(week)) {
        dict.set(week, []);
      }

      dict.get(week)!.push(subject);
    }
  }

  return dict;
}

export function byPeriods(subjects: Subject[]) {
  const dict: Map<number, Subject[]> = new Map();

  for (const subject of subjects) {
    const periods = subject.periods;
    for (const period of periods) {
      if (!dict.has(period)) {
        dict.set(period, []);
      }

      dict.get(period)!.push(subject);
    }
  }

  return dict;
}

export function byDOW(subjects: Subject[]) {
  const dict: Map<DOW, Subject[]> = new Map();

  for (const subject of subjects) {
    const dow = subject.dow;
    if (!dict.has(dow)) {
      dict.set(dow, []);
    }

    dict.get(dow)!.push(subject);
  }

  return dict;
}
