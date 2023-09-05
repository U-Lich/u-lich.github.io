import { forwardRef, useImperativeHandle, useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

export type ColorPickerRef = {
  open: () => void;
  close: () => void;
};

export type ColorPickerProps = React.ComponentPropsWithoutRef<
  typeof HexColorPicker
>;

const ColorPicker = forwardRef<ColorPickerRef, ColorPickerProps>(
  (props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
      },
      close: () => {
        dialogRef.current?.close();
      },
    }));

    return (
      <dialog
        ref={dialogRef}
        className="absolute isolate z-10 rounded-xl bg-white shadow-xl shadow-blue-100 backdrop:bg-white/70 backdrop:backdrop-blur-sm"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        // close on backdrop click
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="flex flex-col items-center justify-center gap-6 p-10">
          <HexColorPicker {...props} />
          <HexColorInput {...props} className="rounded-lg" />
        </div>
      </dialog>
    );
  },
);

export default ColorPicker;
