import Conversion from "../../../objects/conversion/Conversion";
import ConversionState from "../../../objects/conversion/state/ConversionState";
import ConversionDecoration from "../../../objects/conversion/decoration/ConversionDecoration";
import OutputFormat from "../../../objects/conversion/format/OutputFormat";
import { Schedule } from "../../../objects/schedule/Schedule";

export type ConversionAction =
  | {
      type: "LOAD_OBJECT";
      text: string;
      schedule: Schedule;
      advance?: boolean;
    }
  | {
      type: "LOAD_DECORATION";
      decoration: ConversionDecoration;
      advance?: boolean;
    }
  | {
      type: "LOAD_FORMAT";
      format: OutputFormat;
      advance?: boolean;
    }
  | {
      type: "SYNC";
    }
  | {
      type: "SWITCH_STATE";
      state: ConversionState;
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
      return handleLoadObject(
        state,
        action.text,
        action.schedule,
        action.advance,
      );
    case "LOAD_DECORATION":
      return handleLoadDecoration(state, action.decoration, action.advance);
    case "LOAD_FORMAT":
      return handleLoadFormat(state, action.format, action.advance);
    case "SYNC":
      return handleSync(state);
    case "SWITCH_STATE":
      return handleSwitchState(state, action.state);
    default:
      return state;
  }
}

function handleLoadObject(
  state: Conversion,
  text: string,
  schedule: Schedule,
  advance?: boolean,
): Conversion {
  return {
    ...state,
    state: advance ? ConversionState.DECORATION : state.state,
    text,
    schedule,
  };
}

function handleLoadDecoration(
  state: Conversion,
  decoration: ConversionDecoration,
  advance?: boolean,
): Conversion {
  return {
    ...state,
    state: advance ? ConversionState.FORMAT : state.state,
    decoration: decoration,
  };
}

function handleLoadFormat(
  state: Conversion,
  format: OutputFormat,
  advance?: boolean,
): Conversion {
  return {
    ...state,
    state: advance ? ConversionState.OBJECT : state.state,
    format,
  };
}

function handleSync(state: Conversion): Conversion {
  return {
    ...state,
  };
}

function handleSwitchState(
  conversion: Conversion,
  state: ConversionState,
): Conversion {
  return {
    ...conversion,
    state,
  };
}
