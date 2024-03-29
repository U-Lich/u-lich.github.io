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
      <div>
        <span className="text-lg font-bold italic">Thời khóa biểu...</span>
      </div>
      {!schedule ? (
        <></>
      ) : (
        <div className="flex w-full flex-col items-stretch gap-1">
          <div className="flex grow flex-row justify-stretch gap-1">
            <div className="grow truncate font-medium">
              <span className="truncate">Học kỳ</span>
            </div>
            <div className="truncate">
              <span>{schedule.season.semester}</span>
            </div>
          </div>
          <div className="flex grow flex-row justify-stretch gap-1">
            <div className="grow truncate font-medium">
              <span className="truncate">Năm học</span>
            </div>
            <div className="truncate">
              <span>{`${schedule.season.year[0]} - ${schedule.season.year[1]}`}</span>
            </div>
          </div>
          <div className="flex grow flex-row justify-stretch gap-1">
            <div className="grow truncate font-medium">
              <span className="truncate">Số môn học</span>
            </div>
            <div className="truncate">
              <span>
                {
                  schedule.subjects.reduce(
                    (acc, cur) =>
                      acc.includes(cur.name) ? acc : acc.concat(cur.name),
                    [] as string[],
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      )}
      <textarea
        ref={area}
        className={`resize-none overflow-y-hidden rounded-xl border-none bg-white p-4 shadow-xl outline-none transition-all placeholder:text-center placeholder:font-medium hover:shadow-lg hover:outline-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black active:shadow-none ${
          errorMessage.length > 0
            ? "shadow-red-100 hover:shadow-red-200"
            : "shadow-blue-100 hover:shadow-blue-200"
        }`}
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
      {errorMessage.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-row justify-center gap-2">
          <p className="italic text-red-500">{errorMessage}</p>
        </div>
      )}
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
