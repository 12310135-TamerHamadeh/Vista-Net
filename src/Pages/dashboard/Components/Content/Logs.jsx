export default function Logs({ logs = [] }) {
  return (
    <div className="w-full">
      <div
        className="
          h-72 overflow-auto rounded-md border border-zinc-200 bg-white p-3
          dark:border-zinc-700 dark:bg-zinc-900
        "
      >
        {logs.length === 0 ? (
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            No logs yet
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log, idx) => {
              if (typeof log === "string") {
                return (
                  <div
                    key={idx}
                    className="text-xs text-zinc-700 dark:text-zinc-200"
                  >
                    {log}
                  </div>
                );
              }

              const statusColor =
                log.status === "Active"
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : log.status === "Inactive"
                  ? "bg-red-500/15 text-red-600 dark:text-red-400"
                  : "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300";

              return (
                <div
                  key={log.id ?? idx}
                  className="
                    flex items-start justify-between gap-3
                    rounded border border-zinc-200 bg-zinc-50 px-3 py-2
                    dark:border-zinc-700 dark:bg-zinc-800/40
                  "
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                      {log.host_name ?? "Unknown Host"}{" "}
                      <span className="font-mono text-zinc-500 dark:text-zinc-400">
                        ({log.ip})
                      </span>
                    </div>

                    <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">
                      {log.message ?? "-"}
                    </div>

                    <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                      {log.created_at ?? ""}
                      {log.latency_ms ? ` • ${log.latency_ms}ms` : ""}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold ${statusColor}`}
                  >
                    {(log.status ?? "Unknown").toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
