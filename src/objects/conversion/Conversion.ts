import { Schedule } from "../schedule/Schedule";
import ConversionDecoration from "./decoration/ConversionDecoration";
import OutputFormat from "./format/OutputFormat";
import ConversionState from "./state/ConversionState";

export default interface Conversion {
  state: ConversionState;
  text: string | null;
  schedule: Schedule | null;
  decoration: ConversionDecoration | null;
  format: OutputFormat | null;
}
