import { type CalendarDecoration } from "../decoration/ConversionDecoration";
import { type SheetDecoration } from "../decoration/sheet-decoration/SheetDecoration";

export type OutputFormat =
  | {
      type: "google-calendar";
      decoration: CalendarDecoration | null;
    }
  | {
      type: "xlsx";
      decoration: SheetDecoration;
    };

export type OutputFormatType = OutputFormat["type"];
