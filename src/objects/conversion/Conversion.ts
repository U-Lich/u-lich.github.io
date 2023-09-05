import { Schedule } from "../schedule/Schedule";
import { OutputFormat } from "./format/OutputFormat";
import ConversionState from "./state/ConversionState";

export default interface Conversion {
  state: ConversionState;
  text: string | null;
  schedule: Schedule | null;
  format: OutputFormat | null;
}
