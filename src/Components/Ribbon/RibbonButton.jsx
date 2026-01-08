import React from "react";

export default function RibbonButton({
  id,
  onClick,
  icon: Icon,
  children,
  variant = "default",
  disabled = false,
}) {
  const base =
    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded border text-[11px] font-medium transition";

  const styles =
    variant === "primary"
      ? "text-white border-blue-900 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
      : "text-zinc-800 border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400";

  const disabledStyles =
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-inherit disabled:hover:border-inherit";

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${disabledStyles}`}
    >
      {Icon ? <Icon className="h-4 w-4 stroke-current" aria-hidden /> : null}
      <span>{children}</span>
    </button>
  );
}
