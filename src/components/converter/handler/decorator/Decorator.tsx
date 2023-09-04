import { type ReactNode } from "react";
import useConversion from "../../../../hooks/useConversion";
import GoogleDecorator from "./google-calendar-decorator/GoogleDecorator";
import SheetDecorator from "./sheet-decorator/SheetDecorator";

export default function Decorator() {
  const { conversion } = useConversion();

  if (!conversion) {
    return <></>;
  }

  if (conversion.format === "google-calendar") {
    return (
      <Wrapper>
        <GoogleDecorator />
      </Wrapper>
    );
  }

  if (conversion.format === "xlsx") {
    return (
      <Wrapper>
        <SheetDecorator />
      </Wrapper>
    );
  }

  return <></>;
}

function Wrapper({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div>
        <span className="text-lg font-bold italic">Tùy chỉnh...</span>
      </div>
      {children}
    </div>
  );
}
