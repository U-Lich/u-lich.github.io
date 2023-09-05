export type SheetDecoration = {
  type: "sheet";
  params: Map<string, string>;
};

export const DecorationParams = {
  TITLE_COLOR: "TITLE_COLOR",
  TITLE_FONT_COLOR: "TITLE_FONT_COLOR",
  HEADER_COLOR: "HEADER_COLOR",
  HEADER_FONT_COLOR: "HEADER_FONT_COLOR",
  BODY_COLOR: "BODY_COLOR",
  BODY_FONT_COLOR: "BODY_FONT_COLOR",
  BORDER_COLOR: "BORDER_COLOR",
} as const;

export type DecorationParams =
  (typeof DecorationParams)[keyof typeof DecorationParams];

export const defaultSheetDecoration: {
  [key in DecorationParams]: string;
} = {
  [DecorationParams.TITLE_COLOR]: "#e0e0e0",
  [DecorationParams.TITLE_FONT_COLOR]: "#000000",
  [DecorationParams.HEADER_COLOR]: "#f0f0f0",
  [DecorationParams.HEADER_FONT_COLOR]: "#000000",
  [DecorationParams.BODY_COLOR]: "#ffffff",
  [DecorationParams.BODY_FONT_COLOR]: "#000000",
  [DecorationParams.BORDER_COLOR]: "#000000",
};

export function getDefaultSheetDecoration(): Map<string, string> {
  return new Map(Object.entries(defaultSheetDecoration));
}

const ViParams: {
  [key in DecorationParams]: string;
} = {
  [DecorationParams.TITLE_COLOR]: "Tựa đề (nền)",
  [DecorationParams.TITLE_FONT_COLOR]: "Tựa đề",
  [DecorationParams.HEADER_COLOR]: "Tiêu đề (nền)",
  [DecorationParams.HEADER_FONT_COLOR]: "Tiêu đề",
  [DecorationParams.BODY_COLOR]: "Bảng (nền)",
  [DecorationParams.BODY_FONT_COLOR]: "Bảng",
  [DecorationParams.BORDER_COLOR]: "Viền",
};

export function getViParams(key: DecorationParams): string {
  return ViParams[key];
}
