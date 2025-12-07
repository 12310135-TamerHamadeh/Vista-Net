import "../Styles/Statistics.css"

export default function Statistics({ hosts }) {
  return (
    <div className="statistics">
      <h2 className="stats-title">Hosts Statistics</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Latency (ms)</th>
            <th>Uptime %</th>
            <th>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {hosts.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty">
                No hosts added yet
              </td>
            </tr>
          ) : (
            hosts.map((host, idx) => (
              <tr key={idx}>
                <td>{host.name}</td>
                <td>{host.ip}</td>
                <td>
                  <span className="status-pill">{host.activity}</span>
                </td>
                <td>{host.latency || "—"}</td>
                <td>{host.uptime || "—"}</td>
                <td>{host.lastChecked || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
