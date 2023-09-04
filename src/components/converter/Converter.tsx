import { useMemo, useRef, useEffect, useState, ReactNode } from "react";
import ConversionProvider from "../../contexts/conversion/ConversionProvider";
import useConversion from "../../hooks/useConversion";
import ConversionState from "../../objects/conversion/state/ConversionState";
import ProgressIndicator from "./progress-indicator/ProgressIndicator";

export default function ConverterWrapper() {
  return (
    <ConversionProvider>
      <Converter />
    </ConversionProvider>
  );
}

function Converter() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-72 w-72 flex-col">
        <StateController state={ConversionState.OBJECT} />
        <StateController state={ConversionState.DECORATION} />
      </div>
      <ProgressIndicator />
    </div>
  );
}

function StateController({
  state,
  children,
}: {
  state: ConversionState;
  children?: ReactNode | ReactNode[];
}) {
  const { conversion } = useConversion();

  const container = useRef<HTMLDivElement>(null);

  const isVisible = useMemo(() => {
    return conversion && state === conversion.state;
  }, [conversion, state]);

  const [isHidden, setIsHidden] = useState(!isVisible);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    if (isVisible) {
      setIsHidden(false);
      return;
    }

    const setHidden = () => {
      setIsHidden(true);
    };

    const current = container.current;
    current.addEventListener("animationend", setHidden, {
      once: true,
    });

    return () => {
      current?.removeEventListener("animationend", setHidden);
    };
  }, [isVisible]);

  return (
    <div
      ref={container}
      className={`absolute left-0 top-0 h-full w-full overflow-y-auto rounded-xl bg-white px-4 py-4 shadow-2xl shadow-blue-200 ${
        isVisible ? "animate-pop-in opacity-100" : "animate-pop-out opacity-0"
      } ${isHidden ? "hidden" : "block"}`}
    >
      {children}
    </div>
  );
}
