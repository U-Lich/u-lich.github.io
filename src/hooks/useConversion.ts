import { useContext } from "react";
import {
  ConversionContext,
  ConversionUpdaterContext,
} from "../contexts/conversion/ConversionProvider";
export default function useConversion() {
  const conversion = useContext(ConversionContext);
  const updateConversion = useContext(ConversionUpdaterContext);

  return {
    conversion,
    updateConversion,
  };
}
