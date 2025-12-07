import "../Styles/Logs.css"

export default function Logs({ logs }) {
  return (
    <div className="logs">
      <div className="logs-output">
        {logs.length === 0 ? (
          <div className="empty">No logs yet</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="log-line">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
