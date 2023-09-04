import {
  type Dispatch,
  createContext,
  type ReactNode,
  useReducer,
} from "react";
import Conversion from "../../objects/conversion/Conversion";
import {
  ConversionAction,
  reducer,
  defaultState,
} from "./reducer/ConversionReducer";

export const ConversionContext = createContext<Conversion | null>(null);
export const ConversionUpdaterContext =
  createContext<Dispatch<ConversionAction> | null>(null);

export default function ConversionProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [conversion, updateConversion] = useReducer(reducer, defaultState);

  return (
    <ConversionContext.Provider value={conversion}>
      <ConversionUpdaterContext.Provider value={updateConversion}>
        {children}
      </ConversionUpdaterContext.Provider>
    </ConversionContext.Provider>
  );
}
