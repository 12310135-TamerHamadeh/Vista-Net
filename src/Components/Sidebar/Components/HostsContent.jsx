import { HostItem } from "./HostItem";

export function HostsContent({
  loading,
  hosts,
  groupedHosts,
  deleteMode,
  selectedHost,
  setSelectedHost,
  setHosts,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-3">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-[13px] text-[#999]">Loading hosts...</p>
        </div>
      ) : hosts.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center gap-3">
          <p className="text-[13px] text-[#999]">No hosts added yet!</p>
          <button
            type="button"
            className="px-3 py-2 rounded text-[12px] cursor-pointer bg-[#4a90e2] text-white"
          >
            Add First Host
          </button>
        </div>
      ) : (
        Object.entries(groupedHosts).map(([network, networkHosts]) => (
          <div key={network} className="mb-3">
            <div className="px-1 py-2 text-[11px] font-bold tracking-[0.5px] uppercase text-[#666]">
              {network}
            </div>

            <div className="flex flex-col gap-1">
              {networkHosts.map((host) => (
                <HostItem
                  key={host.id}
                  host={host}
                  deleteMode={deleteMode}
                  selectedHost={selectedHost}
                  setSelectedHost={setSelectedHost}
                  setHosts={setHosts}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
