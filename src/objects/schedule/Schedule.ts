import { DOW } from "../dow/DOW";

export interface Subject {
  id: number;
  name: string;
  group: string | null;
  credit: number;
  type: "theory" | "discussion";
  dow: DOW;
  period: number;
  room: string;
  week: number;
}

export interface Schedule {
  start: Date;
  subjects: Subject[];
}
