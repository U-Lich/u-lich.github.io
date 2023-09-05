import { Subject } from "../../schedule/Schedule";
import { SheetDecoration } from "./sheet-decoration/SheetDecoration";

export type ColorMap = {
  [key: string]: string;
};

type CalendarMonochrome = {
  type: "calendar";
  preset: "monochrome";
};

type CalendarColorful = {
  type: "calendar";
  preset: "colorful";
  colorMap: ColorMap;
};

export type CalendarDecoration = CalendarMonochrome | CalendarColorful;

type ConversionDecoration = SheetDecoration | CalendarDecoration;

export type Preset = "monochrome" | "colorful";
export type DecorationType = "sheet" | "calendar";

export default ConversionDecoration;

export function getDefaultColorMap(
  subjects: Subject[],
  preset: Preset,
): ColorMap {
  switch (preset) {
    case "monochrome":
      return getDefaultMonochrome(subjects);
    case "colorful":
      return getDefaultColorful(subjects);
  }
}

function getDefaultMonochrome(subjects: Subject[]): ColorMap {
  const colorMap: ColorMap = {};

  for (const subject of subjects) {
    colorMap[subject.name] = "0xe0e0e0";
  }

  return colorMap;
}

function getDefaultColorful(subjects: Subject[]): ColorMap {
  const colorMap: ColorMap = {};

  for (const subject of subjects) {
    colorMap[subject.name] = "0xe0e0e0";
  }

  return colorMap;
}
