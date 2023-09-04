import { DOW, parseViDOW } from "../dow/DOW";

type ClassType = "theory" | "discussion";

export interface Subject {
  id: number;
  classId: string;
  name: string;
  group: string | null;
  credits: number;
  type: ClassType;
  dow: DOW;
  periods: number[];
  room: string;
  weeks: number[];
}

export interface Schedule {
  start: Date;
  subjects: Subject[];
}

import SubjectRegex from "../../constants/schedule/SubjectRegex";

export default function parseScheduleText(text: string): Schedule {
  const startText = RegExp(
    /Tuần bắt đầu học kỳ.*(\d{2})\/(\d{2})\/(\d{4})/,
  ).exec(text);

  if (!startText) {
    throw new Error("Start date not found");
  }

  const startDate = new Date(
    parseInt(startText[3]),
    parseInt(startText[2]) - 1,
    parseInt(startText[1]),
  );
  const subjects = parseSubjectsText(text);

  if (subjects.length === 0) {
    throw new Error("No subjects found");
  }

  return {
    start: startDate,
    subjects,
  } satisfies Schedule;
}

function parseSubjectsText(text: string) {
  const subjects: Subject[] = [];

  const matchIt = text.matchAll(SubjectRegex);
  let match = matchIt.next();

  while (!match.done) {
    const classType = parseViClassType(match.value[6]);
    if (!classType) {
      throw new Error(`Unknown class type: ${match.value[6]}`);
    }

    const dow = parseViDOW(match.value[7]);
    if (!dow) {
      throw new Error(`Unknown DOW: ${match.value[7]}`);
    }

    const periods = parseDashDelimNumber(match.value[8]);
    if (periods.length === 0) {
      throw new Error(`No periods found: ${match.value[8]}`);
    }

    const weeks = parseDashDelimNumber(match.value[10]);
    if (weeks.length === 0) {
      throw new Error(`No weeks found: ${match.value[10]}`);
    }

    const subject: Subject = {
      id: parseInt(match.value[1]),
      classId: match.value[2],
      group: match.value[3].length > 0 ? match.value[3] : null,
      name: match.value[4],
      credits: parseInt(match.value[5]),
      type: classType,
      dow,
      periods,
      room: match.value[9],
      weeks,
    } satisfies Subject;

    subjects.push(subject);

    match = matchIt.next();
  }

  return subjects;
}

function parseViClassType(text: string): ClassType | null {
  const lowercase = text.toLowerCase();

  if (lowercase.includes("lý thuyết")) {
    return "theory";
  }

  if (lowercase.includes("thảo luận")) {
    return "discussion";
  }

  return null;
}

function parseDashDelimNumber(text: string): number[] {
  // e.g. 123------01----- => 1,2,3,10,11
  // e.g. 123______01_____ => 1,2,3,10,11
  const numberList: number[] = [];
  const numberRegex = /\d+/g;

  for (let i = 0; i < text.length; i++) {
    if (!numberRegex.test(text[i])) {
      continue;
    }

    numberList.push(i + 1);
  }

  return numberList;
}
