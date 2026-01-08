import { useState } from "react";

const Topology = ({ hosts= [], settings = {} }) => {
  const [hoveredHost, setHoveredHost] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Group hosts by network (subnet_mask)
  const groupHostsByNetwork = () => {
    const groups = {};

    hosts.forEach((host) => {
      const network = host.subnet_mask || "Default Network";
      if (!groups[network]) groups[network] = [];
      groups[network].push(host);
    });

    return groups;
  };

  // Find gateway/router in a network group
  const findGateway = (networkHosts) => {
    return (
      networkHosts.find(
        (h) =>
          h.label?.toLowerCase().includes("gateway") ||
          h.label?.toLowerCase().includes("router") ||
          h.name?.toLowerCase().includes("router") ||
          h.ip === "192.168.1.1" ||
          h.ip?.endsWith(".1")
      ) || networkHosts[0]
    );
  };

  const findRegularHosts = (networkHosts, gateway) =>
    networkHosts.filter((h) => h !== gateway);

  const handleMouseEnter = (host, e) => {
    setHoveredHost(host);
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const handleMouseLeave = () => setHoveredHost(null);

  const handleMouseMove = (e) => {
    if (!hoveredHost) return;
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  const networkGroups = groupHostsByNetwork();

  return (
    <div className="w-full h-full relative" onMouseMove={handleMouseMove}>
      {/* Wrapper */}
      <div
        className="
          w-full h-full overflow-auto p-5 rounded-md
          bg-white
          dark:bg-[#1f2937]
        "
      >
        <div className="w-full min-h-[400px] flex flex-col items-center justify-start">
          {/* Multi tree container */}
          <div className="flex flex-wrap gap-10 justify-center w-full">
            {Object.entries(networkGroups).map(([network, networkHosts]) => {
              const gateway = findGateway(networkHosts);
              const regularHosts = findRegularHosts(networkHosts, gateway);
              const gatewayActive = gateway?.activity === "Active";

              return (
                <div
                  key={network}
                  className="flex flex-col items-center min-w-[300px]"
                >
                  {/* Network label */}
                  <div
                    className="
                      mb-2.5 px-2 py-1 rounded
                      text-[11px] font-semibold uppercase tracking-[0.5px]
                      text-[#4b5563] bg-[#f3f4f6]
                      dark:text-[#d1d5db] dark:bg-[#374151]
                    "
                  >
                    {network}
                  </div>

                  {/* Gateway level */}
                  <div className="flex justify-center items-center w-full mb-10 relative">
                    <div
                      onMouseEnter={(e) => handleMouseEnter(gateway, e)}
                      onMouseLeave={handleMouseLeave}
                      className={[
                        "w-[160px] h-[80px] rounded-lg p-3",
                        "flex flex-col items-center justify-center text-center relative",
                        "bg-white border-2 shadow-sm",
                        "dark:bg-[#374151] dark:border-[#4b5563]",
                        gatewayActive
                          ? "border-emerald-500"
                          : "border-red-500",
                      ].join(" ")}
                    >
                      <div className="text-[14px] font-semibold text-[#111827] dark:text-[#f9fafb]">
                        {gateway?.name}
                      </div>
                      <div className="text-[12px] font-mono text-[#6b7280] dark:text-[#d1d5db]">
                        {gateway?.ip}
                      </div>

                      {/* status dot */}
                      <span
                        className={[
                          "absolute top-2.5 right-2.5 h-2 w-2 rounded-full",
                          gatewayActive ? "bg-emerald-500" : "bg-red-500",
                        ].join(" ")}
                      />
                    </div>
                  </div>

                  {/* Connection down from gateway */}
                  {regularHosts.length > 0 && (
                    <div className="relative w-full h-5 flex justify-center -mt-6">
                      <div className="w-[2px] h-5 bg-[#d1d5db] dark:bg-[#4b5563]" />
                    </div>
                  )}

                  {/* Hosts level */}
                  {regularHosts.length > 0 && (
                    <div className="flex flex-wrap gap-5 justify-center">
                      {regularHosts.map((host) => {
                        const isActive = host.activity === "Active";

                        return (
                          <div key={host.id ?? host.ip} className="relative">
                            {/* vertical line above each host */}
                            <div
                              className="
                                absolute -top-5 left-1/2 -translate-x-1/2
                                w-[2px] h-5
                                bg-[#d1d5db] dark:bg-[#4b5563]
                                -z-10
                              "
                            />

                            {/* host node */}
                            <div
                              onMouseEnter={(e) => handleMouseEnter(host, e)}
                              onMouseLeave={handleMouseLeave}
                              className={[
                                "w-[140px] h-[70px] rounded-md p-2.5",
                                "flex flex-col items-center justify-center text-center relative",
                                "bg-white border shadow-sm transition",
                                "border-[#e5e7eb] hover:border-[#9ca3af] hover:shadow",
                                "dark:bg-[#374151] dark:border-[#4b5563] dark:hover:border-[#6b7280]",
                                isActive
                                  ? "border-l-[3px] border-l-emerald-500"
                                  : "border-l-[3px] border-l-red-500",
                              ].join(" ")}
                            >
                              <div className="text-[13px] font-semibold text-[#111827] dark:text-[#f9fafb] max-w-full truncate">
                                {host.name}
                              </div>
                              <div className="text-[11px] font-mono text-[#6b7280] dark:text-[#d1d5db]">
                                {host.ip}
                              </div>

                              {/* status dot */}
                              <span
                                className={[
                                  "absolute top-2 right-2 h-2 w-2 rounded-full",
                                  isActive ? "bg-emerald-500" : "bg-red-500",
                                ].join(" ")}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredHost && (
        <div
          className="
            fixed z-[1000] pointer-events-none
            bg-[#111827] text-white
            px-3 py-2 rounded
            text-[11px] leading-[1.4]
            shadow-lg backdrop-blur
            max-w-[180px]
          "
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <strong className="block mb-1 text-[12px]">
            {hoveredHost.name}
          </strong>

          <div>IP: {hoveredHost.ip}</div>
          {hoveredHost.label && <div>Type: {hoveredHost.label}</div>}
          {hoveredHost.subnet_mask && <div>Network: {hoveredHost.subnet_mask}</div>}

          <div
            className={[
              "inline-block mt-1 px-2 py-[2px] rounded-full text-[10px] font-semibold",
              hoveredHost.activity === "Active"
                ? "bg-emerald-500"
                : "bg-red-500",
            ].join(" ")}
          >
            {hoveredHost.activity === "Active" ? "ACTIVE" : "INACTIVE"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topology;
