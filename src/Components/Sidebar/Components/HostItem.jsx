import { Trash2 } from "lucide-react";
import { handleDeleteHost } from "../../../Services/handleDelete";

export function HostItem({
  host,
  deleteMode,
  selectedHost,
  setSelectedHost,
  setHosts,
}) {
  const isActive = host.activity === "Active";
  const isSelected = selectedHost === host.ip;

  return (
    <div
      onClick={() => setSelectedHost(isSelected ? "" : host.ip)}
      className={[
        "relative p-2 rounded border cursor-pointer transition flex items-center justify-between",
        "bg-white border-[#ddd] hover:bg-[#f0f0f0] hover:border-[#bbb]",
        "dark:bg-[#333] dark:border-[#555] dark:text-[#eee] dark:hover:bg-[#404040]",
        isSelected ? "bg-[#d4e6f1] border-[#4a90e2] dark:bg-[#1a4a7a]" : "",
        deleteMode ? "bg-[#fff5f5] border-[#ffcccc]" : "",
      ].join(" ")}
    >
      <div className="flex-1">
        <div className="text-[12px] font-semibold text-[#333] dark:text-[#eee]">
          {host.name}
        </div>

        <div className="mt-0.5 text-[11px] font-mono text-[#666] dark:text-[#ccc]">
          {host.ip}
        </div>

        {host.label ? (
          <div className="mt-0.5 text-[10px] text-[#999] dark:text-[#aaa]">
            {host.label}
          </div>
        ) : null}
      </div>

      <div className="ml-2 flex items-center gap-2">
        {/* Pulse dot */}
        <span className="relative inline-flex h-2 w-2">
          <span
            className={[
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              isActive ? "bg-green-500" : "bg-red-500",
            ].join(" ")}
          />
          <span
            className={[
              "relative inline-flex h-2 w-2 rounded-full",
              isActive ? "bg-green-500" : "bg-red-500",
            ].join(" ")}
          />
        </span>

        {deleteMode && (
          <button
            type="button"
            title="Delete host"
            onClick={(e) =>
              handleDeleteHost(
                host.id,
                host.ip,
                e,
                selectedHost,
                setHosts,
                setSelectedHost
              )
            }
            className="bg-transparent border-0 cursor-pointer text-[#ff6b6b] px-1 py-0.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
