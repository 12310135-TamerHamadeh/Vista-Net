const Statistics = ({ hosts = [] }) => {
  return (
    <div className="w-full">
      <h2 className="mb-3 text-[14px] font-semibold text-[#333] dark:text-[#eee]">
        Hosts Statistics
      </h2>

      <div className="overflow-hidden rounded-md border border-[#e0e0e0] bg-white dark:border-[#444] dark:bg-[#2a2a2a]">
        <table className="w-full border-collapse">
          <thead className="bg-[#f5f5f5] dark:bg-[#1f1f1f]">
            <tr>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                Name
              </th>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                IP Address
              </th>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                Status
              </th>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                Latency (ms)
              </th>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                Uptime %
              </th>
              <th className="p-3 text-left text-[12px] font-semibold text-[#333] border-b border-[#e0e0e0] dark:text-[#eee] dark:border-[#444]">
                Last Checked
              </th>
            </tr>
          </thead>

          <tbody>
            {hosts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-3 text-center text-[13px] text-[#999]"
                >
                  No hosts added yet
                </td>
              </tr>
            ) : (
              hosts.map((host, idx) => (
                <tr
                  key={host.id ?? idx}
                  className="hover:bg-[#fafafa] dark:hover:bg-[#333] transition"
                >
                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] text-[#333] dark:text-[#ccc] dark:border-[#333]">
                    {host.name}
                  </td>

                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] text-[#333] dark:text-[#ccc] dark:border-[#333] font-mono">
                    {host.ip}
                  </td>

                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] dark:border-[#333]">
                    <span className="inline-block px-2 py-1 rounded text-[12px] bg-[#e8e8e8] text-[#666] dark:bg-[#1f1f1f] dark:text-[#ccc]">
                      {host.activity}
                    </span>
                  </td>

                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] text-[#333] dark:text-[#ccc] dark:border-[#333]">
                    {host.latency_ms || "—"}
                  </td>

                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] text-[#333] dark:text-[#ccc] dark:border-[#333]">
                    {host.uptime || "—"}
                  </td>

                  <td className="p-3 text-[13px] border-b border-[#f0f0f0] text-[#333] dark:text-[#ccc] dark:border-[#333]">
                    {host.last_checked || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
