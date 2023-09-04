import { Icon } from "@iconify/react";

export default function InfoBlock() {
  return (
    <div className="flex h-fit w-fit flex-col items-center">
      <a
        href="https://github.com/U-Lich/u-lich.github.io"
        target="_blank"
        className="group rounded-xl px-4 py-4 shadow-inner shadow-black/0 transition-all hover:shadow-black/20 focus:shadow-black/20 active:shadow-black/40"
      >
        <div className="flex h-fit w-fit flex-col items-center gap-1 transition-transform group-hover:scale-95 group-focus:scale-95 group-active:scale-90">
          <Icon icon="mdi:github" width="40px" />
          <span className="text-center">
            Mã nguồn <br /> và hướng dẫn sử dụng
          </span>
        </div>
      </a>
    </div>
  );
}
