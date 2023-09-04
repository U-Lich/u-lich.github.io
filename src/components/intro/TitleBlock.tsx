import { Icon } from "@iconify/react";

export default function TitleBlock() {
  return (
    <a
      href="/"
      className="group rounded-xl px-4 py-4 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40"
    >
      <div className="flex h-fit w-fit flex-row items-center gap-4 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
        <Icon icon="fluent-emoji:calendar" width="64px" />
        <span className="h1 text-5xl font-extrabold italic">U-Lich</span>
      </div>
    </a>
  );
}
