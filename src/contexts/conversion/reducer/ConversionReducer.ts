import Conversion from "../../../objects/conversion/Conversion";
import ConversionState from "../../../objects/conversion/state/ConversionState";
import ConversionDecoration from "../../../objects/conversion/decoration/ConversionDecoration";
import OutputFormat from "../../../objects/conversion/format/OutputFormat";

export type ConversionAction =
  | {
      type: "LOAD_OBJECT";
      text: string;
    }
  | {
      type: "LOAD_DECORATION";
      decoration: ConversionDecoration;
    }
  | {
      type: "LOAD_FORMAT";
      format: OutputFormat;
    }
  | {
      type: "SYNC";
    };

export const defaultState: Conversion = {
  state: ConversionState.OBJECT,
  text: null,
  schedule: null,
  decoration: null,
  format: null,
} as const;

export function reducer(state: Conversion, action: ConversionAction) {
  switch (action.type) {
    case "LOAD_OBJECT":
      return handleLoadObject(state, action.text);
    case "LOAD_DECORATION":
      return handleLoadDecoration(state, action.decoration);
    case "LOAD_FORMAT":
      return handleLoadFormat(state, action.format);
    case "SYNC":
      return handleSync(state);
    default:
      return state;
  }
}

function handleLoadObject(state: Conversion, text: string): Conversion {
  return {
    ...state,
    state: ConversionState.OBJECT,
    text,
  };
}

function handleLoadDecoration(
  state: Conversion,
  decoration: ConversionDecoration,
): Conversion {
  return {
    ...state,
    state: ConversionState.DECORATION,
    decoration: decoration,
  };
}

function handleLoadFormat(state: Conversion, format: OutputFormat): Conversion {
  return {
    ...state,
    state: ConversionState.FORMAT,
    format,
  };
}

function handleSync(state: Conversion): Conversion {
  return {
    ...state,
    state: ConversionState.SYNCED,
  };
}
