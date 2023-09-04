import useConversion from "../../../../hooks/useConversion";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Formatter() {
  const { conversion, updateConversion } = useConversion();

  if (!conversion || !updateConversion) {
    return <></>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <div>
        <span className="text-lg font-bold italic">Lưu vào...</span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <button
          className={`flex flex-row items-center gap-4 rounded-xl px-4 py-2 shadow-xl shadow-blue-100 transition-shadow hover:shadow-lg hover:shadow-blue-200 focus:shadow-none active:shadow-none ${
            conversion.format && conversion.format === "google-calendar"
              ? "bg-blue-400 text-white"
              : "bg-white text-black"
          }`}
          title="Lưu vào tài khoản Google - Google Calendar. Phải đăng nhập."
          onClick={() => {
            updateConversion({
              type: "LOAD_FORMAT",
              format: "google-calendar",
            });
          }}
        >
          <Icon icon="fluent-emoji:sun-behind-small-cloud" width="40px" />
          <span className="text-left font-semibold">Google Calendar</span>
        </button>
        <button
          className={`flex flex-row items-center gap-4 rounded-xl px-4 py-2 shadow-xl shadow-blue-100 transition-shadow hover:shadow-lg hover:shadow-blue-200 focus:shadow-none active:shadow-none ${
            conversion.format && conversion.format === "xlsx"
              ? "bg-blue-400 text-white"
              : "bg-white text-black"
          }`}
          title="Tải về dạng bảng tính .xlsx. Không cần đăng nhập."
          onClick={() => {
            updateConversion({
              type: "LOAD_FORMAT",
              format: "xlsx",
            });
          }}
        >
          <Icon icon="fluent-emoji:laptop" width="40px" />
          <span className="text-left font-semibold">Sheet (.xlsx)</span>
        </button>
      </div>
      <div className="flex flex-row justify-between self-stretch">
        <button
          className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {
            updateConversion({
              type: "SWITCH_STATE",
              state: "OBJECT",
            });
          }}
        >
          <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
            <Icon icon="fluent-emoji:left-arrow" width="24px" />
          </div>
        </button>
        <button
          disabled={conversion.format === null}
          className="group self-end rounded-xl p-2 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => {
            updateConversion({
              type: "SWITCH_STATE",
              state: "DECORATION",
            });
          }}
        >
          <div className="flex h-fit w-fit flex-row items-center gap-2 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
            <Icon icon="fluent-emoji:right-arrow" width="24px" />
          </div>
        </button>
      </div>
    </div>
  );
}
