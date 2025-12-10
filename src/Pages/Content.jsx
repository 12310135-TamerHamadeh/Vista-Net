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
        <h1>Vista Net</h1>
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
        <div className="tab-content">
          <div className="tab-content-scrollable">
            <div className="statistics-section">
              <Statistics hosts={hosts} />
              <div>
                <h3>Logs</h3>
                <Logs logs={logs} />
              </div>
            </div>
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
        <div className="state-section">
          <div className="state-section-header">Device States</div>
          <div className="state-section-content">
            <State hosts={hosts} />
          </div>
        </div>
      )}

      {activeTab === "topology" && (
        <div className="topology-section">
          <div className="topology-section-header">Network Topology</div>
          <div className="topology-container">
            <Topology hosts={hosts} settings={settings} />
          </div>
        </div>
      )}
    </section>
  )
}