import { useEffect } from "react";
import { X } from "lucide-react";

const Popup = ({ open, onClose, title, children, maxWidth = "max-w-xl" }) => {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && open) onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={[
          "w-full overflow-hidden rounded-md border bg-white",
          "border-[#e0e0e0] dark:border-[#444] dark:bg-[#2a2a2a]",
          maxWidth,
        ].join(" ")}
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] dark:border-b-[#444]">
          <div className="text-[14px] font-semibold text-[#333] dark:text-[#eee]">
            {title}
          </div>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="
              h-9 w-9 rounded border transition
              bg-[#e8e8e8] border-[#d0d0d0] hover:bg-[#d8d8d8]
              flex items-center justify-center
              dark:bg-[#333] dark:border-[#555] dark:hover:bg-[#404040]
            "
            aria-label="Close popup"
          >
            <X className="h-4 w-4 text-[#333] dark:text-[#eee]" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
