import { useMemo, useRef, useState } from "react";
import useConversion from "../../../../hooks/useConversion";
import { Icon } from "@iconify/react/dist/iconify.js";
import parseScheduleText from "../../../../objects/schedule/Schedule";

export default function Parser() {
  const { conversion, updateConversion } = useConversion();
  const area = useRef<HTMLTextAreaElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [scheduleText, setScheduleText] = useState("");

  const schedule = useMemo(() => {
    if (scheduleText.length === 0) {
      setErrorMessage("");
      return null;
    }

    try {
      const schedule = parseScheduleText(scheduleText);

      setErrorMessage("");
      return schedule;
    } catch (error) {
      console.error(error);

      const errorWithMessage = error as Error & { message: string };
      if (errorWithMessage.message) {
        setErrorMessage(errorWithMessage.message);
      }

      return null;
    }
  }, [scheduleText]);

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      {errorMessage.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-row justify-center gap-2">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
      <textarea
        ref={area}
        className="resize-none overflow-hidden rounded-xl border-none bg-white p-4 shadow-xl shadow-blue-100 outline-none transition-all placeholder:text-center hover:shadow-lg hover:shadow-blue-200 hover:outline-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black active:shadow-none"
        rows={1}
        // value={conversion.text ?? ""}
        value={scheduleText}
        placeholder="Dán thời khóa biểu vào đây"
        onChange={() => {
          if (!area.current) {
            return;
          }
          setScheduleText(area.current.value);
        }}
      />
      <button
        disabled={!schedule}
        className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => {
          if (!area.current || !schedule) {
            return;
          }

          console.info(schedule);

          updateConversion({
            type: "LOAD_OBJECT",
            text: scheduleText,
            schedule,
            advance: true,
          });
        }}
      >
        <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
          <Icon icon="fluent-emoji:right-arrow" width="24px" />
        </div>
      </button>
    </div>
  );
}
