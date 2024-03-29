export const DOW = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export type DOW = (typeof DOW)[keyof typeof DOW];

const vi: {
  [key in DOW]: string;
} = {
  MONDAY: "Thứ Hai",
  TUESDAY: "Thứ Ba",
  WEDNESDAY: "Thứ Tư",
  THURSDAY: "Thứ Năm",
  FRIDAY: "Thứ Sáu",
  SATURDAY: "Thứ Bảy",
  SUNDAY: "Chủ Nhật",
};

export function toVi(dow: DOW): string {
  return vi[dow];
}

export function parseViDOW(text: string): DOW | null {
  const lowercase = text.toLowerCase();

  for (const viDOW in vi) {
    if (vi[viDOW as DOW].toLowerCase() === lowercase) {
      return viDOW as DOW;
    }
  }

  return null;
}
