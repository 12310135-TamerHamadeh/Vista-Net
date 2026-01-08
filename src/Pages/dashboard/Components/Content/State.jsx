import { useEffect, useState } from "react";

const State = ({ hosts = [] }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const newStates = hosts.map((host) => ({
      name: host.name,
      ip: host.ip,
      status: host.activity || "Down",
      last_checked: host.last_checked,
    }));
    setStates(newStates);
  }, [hosts]);

  return (
    <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {states.length === 0 ? (
        <p className="text-[13px] text-[#999] dark:text-[#777]">
          No hosts yet.
        </p>
      ) : (
        states.map((state, idx) => {
          const isUp = state.status === "Active";

          return (
            <div
              key={idx}
              className={[
                "p-4 rounded-md border flex flex-col gap-2",
                "bg-white border-[#e0e0e0]",
                "dark:bg-[#2a2a2a] dark:border-[#444]",
                isUp
                  ? "border-l-4 border-l-green-500"
                  : "border-l-4 border-l-red-500",
              ].join(" ")}
            >
              <div className="text-[13px] font-semibold text-[#333] dark:text-[#eee]">
                {state.name}
              </div>

              <div className="text-[12px] font-mono text-[#666] dark:text-[#aaa]">
                {state.ip}
              </div>

              <div className="text-[11px] text-[#999] dark:text-[#777]">
                {isUp ? "Up since" : "Down since"}{" "}
                {state.last_checked
                  ? new Date(state.last_checked).toLocaleString()
                  : "—"}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default State;
