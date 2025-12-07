"use client"

import { useState } from "react"
import "../Styles/Content.css"
import Logs from "./Logs"
import State from "./State"
import Statistics from "./Statistics"
import Topology from "./Topology"

export default function Content({ logs, addLog, hosts, settings }) {
  const [activeTab, setActiveTab] = useState("statistics")

  return (
    <section className="content">
      <div className="content-header">
        <h1>Statistics Summary</h1>
        <div className="period" id="periodRange">
          Real-time
        </div>
      </div>

      <div className="tabs-bar">
        {["statistics", "alerts", "state", "topology"].map((tab) => (
          <button key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div className="tabs-spacer"></div>
        <button id="btnRefresh" className="tab">
          Refresh
        </button>
      </div>

      {activeTab === "statistics" && (
        <div style={{ padding: "16px" }}>
          <Statistics hosts={hosts} />
          <div style={{ marginTop: "16px" }}>
            <h3>Logs</h3>
            <Logs logs={logs} />
          </div>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="alerts-section">
          <div className="alert-logs-block">
            <div className="alert-logs-header">Logs</div>
            <Logs logs={logs} />
          </div>

          <div className="alert-ai-block">
            <div className="alert-ai-header">AI Suggestion</div>
            <button
              className="btn primary"
              onClick={() => {
                addLog("AI suggestion requested")
              }}
            >
              Suggest AI
            </button>
            <div id="aiSuggestion" className="ai-suggestion-box">
              Tap "Suggest AI" to get advice.
            </div>
          </div>
        </div>
      )}

      {activeTab === "state" && (
        <div id="stateView" className="table-wrap" style={{ padding: "16px" }}>
          <div style={{ fontWeight: 700, marginBottom: "10px" }}>Device States</div>
          <State hosts={hosts} />
        </div>
      )}

      {activeTab === "topology" && (
        <div id="topologyView" className="table-wrap" style={{ padding: "16px" }}>
          <div style={{ fontWeight: 700, marginBottom: "10px" }}>Network Topology</div>
          <div id="topologySvgWrap" className="topology-container">
            <Topology hosts={hosts} settings={settings} />
          </div>
        </div>
      )}
    </section>
  )
}
