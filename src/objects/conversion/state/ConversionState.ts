const ConversionState = {
  OBJECT: "OBJECT",
  DECORATION: "DECORATION",
  FORMAT: "FORMAT",
  SYNCED: "SYNCED",
} as const;

type ConversionState = (typeof ConversionState)[keyof typeof ConversionState];

export default ConversionState;
