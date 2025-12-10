
"use client"

import { useState, useRef } from "react"
import Ribbon from "./Ribbon"
import HostsSidebar from "./HostsSidebar"
import SettingsModal from "./Settings"
import Content from "./Content"
import { pingService } from "../lib/ping-service.ts"
import "../Styles/Dashboard.css"

const DEFAULT_HOSTS = [
  {
    name: "Router",
    ip: "192.168.1.1",
    activity: "Active",
    networkRange: "192.168.1.0/24",
    label: "Main Gateway",
    group: "Network",
  },
  {
    name: "Server-01",
    ip: "192.168.1.10",
    activity: "Active",
    networkRange: "192.168.1.0/24",
    label: "Web Server",
    group: "Production",
  },
  {
    name: "Workstation-01",
    ip: "192.168.1.20",
    activity: "Inactive",
    networkRange: "192.168.1.0/24",
    label: "Office PC",
    group: "Office",
  },
]

export default function Dashboard() {
  const [hosts, setHosts] = useState(DEFAULT_HOSTS)
  const [selectedHost, setSelectedHost] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [logs, setLogs] = useState([])
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportType, setReportType] = useState("summary")

  const pingInterval = useRef(null)
  const paused = useRef(false)

  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 2,
    showLabels: true,
    animationEnabled: true,
    darkMode: false,
    timeFormat: "24h",
    logLevel: "info",
  })

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString(
      undefined,
      settings.timeFormat === "24h" ? { hour: "2-digit", minute: "2-digit", second: "2-digit" } : undefined,
    )
    setLogs((prev) => [`${timestamp} — ${msg}`, ...prev].slice(0, 100))
  }

  const pingHost = (host) => {
    const success = Math.random() > 0.15
    setHosts((prev) => prev.map((h) => (h.ip === host.ip ? { ...h, activity: success ? "Active" : "Inactive" } : h)))
    addLog(`Host ${host.name} (${host.ip}) is ${success ? "UP" : "DOWN"}`)
  }

  const startPinging = () => {
    if (pingInterval.current) return
    addLog("Pinging started")
    paused.current = false
    if (pingService && pingService.startPinging) {
      pingService.startPinging(hosts, settings.refreshInterval * 1000)
    }

    pingInterval.current = setInterval(() => {
      if (!paused.current) {
        hosts.forEach((host) => pingHost(host))
      }
    }, settings.refreshInterval * 1000)
  }

  const stopPinging = () => {
    if (pingInterval.current) {
      clearInterval(pingInterval.current)
      pingInterval.current = null
    }
    if (pingService && pingService.stopPinging) {
      pingService.stopPinging()
    }
    addLog("Pinging stopped")
  }

  const pausePinging = () => {
    paused.current = true
    if (pingService && pingService.pausePinging) {
      pingService.pausePinging()
    }
    addLog("Pinging paused")
  }

  const resumePinging = () => {
    paused.current = false
    if (pingService && pingService.resumePinging) {
      pingService.resumePinging(hosts, settings.refreshInterval * 1000)
    }
    addLog("Pinging resumed")
  }

  const handleAddHost = (hostData) => {
    setHosts([...hosts, hostData])
    addLog(`Host added: ${hostData.name} (${hostData.ip})`)
  }

  const handleDeleteHost = (ip) => {
    const hostName = hosts.find((h) => h.ip === ip)?.name || ip
    setHosts(hosts.filter((h) => h.ip !== ip))
    addLog(`Host deleted: ${hostName}`)
    if (selectedHost === ip) setSelectedHost(null)
  }

  const handleGenerateReport = () => {
    setReportDialogOpen(true)
  }

  const generateReport = (type) => {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      let reportText = `Vista-Net Network Monitoring Report\n`
      reportText += `=====================================\n\n`
      reportText += `Report Type: ${type === "detailed" ? "Detailed" : "Summary"}\n`
      reportText += `Generated: ${new Date().toLocaleString()}\n`
      reportText += `Total Hosts: ${hosts.length}\n`
      reportText += `Active Hosts: ${hosts.filter(h => h.activity === "Active").length}\n`
      reportText += `Total Logs: ${logs.length}\n\n`
      
      if (type === "detailed") {
        reportText += `HOSTS LIST:\n`
        reportText += `============\n`
        hosts.forEach((host, index) => {
          reportText += `${index + 1}. ${host.name} (${host.ip})\n`
          reportText += `   Status: ${host.activity}\n`
          reportText += `   Network: ${host.networkRange || 'N/A'}\n`
          reportText += `   Group: ${host.group || 'N/A'}\n`
          reportText += `   Label: ${host.label || 'N/A'}\n\n`
        })
        
        reportText += `\nLOG HISTORY:\n`
        reportText += `=============\n`
        logs.forEach((log, index) => {
          reportText += `${index + 1}. ${log}\n`
        })
      } else {
        reportText += `QUICK SUMMARY:\n`
        reportText += `==============\n`
        reportText += `First Log: ${logs[0] || "No logs"}\n`
        reportText += `Last Log: ${logs[logs.length - 1] || "No logs"}\n`
        reportText += `Recent Activity: Last ${Math.min(5, logs.length)} logs:\n`
        logs.slice(0, 5).forEach((log, index) => {
          reportText += `  ${index + 1}. ${log}\n`
        })
      }
      
      reportText += `\n\n--- End of Report ---\n`

      const blob = new Blob([reportText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `VistaNet_Report_${type}_${timestamp}.txt`
      a.click()
      URL.revokeObjectURL(url)
      
      addLog(`${type === "detailed" ? "Detailed" : "Summary"} report generated and downloaded`)
      return true
    } catch (error) {
      console.error("Report generation error:", error)
      addLog("Error generating report")
      return false
    }
  }

  const handleReportDialogConfirm = () => {
    const success = generateReport(reportType)
    if (success) {
      setReportDialogOpen(false)
    }
  }

  const handleReportDialogCancel = () => {
    setReportDialogOpen(false)
    setReportType("summary")
  }

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
    addLog("Settings updated")
  }

  return (
    <div className={`dashboard ${settings.darkMode ? "dark" : "light"}`}>
      <Ribbon
        onStart={startPinging}
        onStop={stopPinging}
        onPause={pausePinging}
        onResume={resumePinging}
        onGenerate={handleGenerateReport}
        onSettings={() => setSettingsOpen(true)}
      />

      <div className="dashboard-layout">
        <HostsSidebar
          hosts={hosts}
          onAddHost={handleAddHost}
          onDeleteHost={handleDeleteHost}
          selectedHost={selectedHost}
          onSelectHost={setSelectedHost}
        />

        <Content logs={logs} addLog={addLog} hosts={hosts} settings={settings} />
      </div>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Report Generation Dialog */}
      {reportDialogOpen && (
        <div className="report-dialog-overlay">
          <div className="report-dialog">
            <div className="report-dialog-header">
              <h3>Generate Report</h3>
              <button onClick={handleReportDialogCancel} className="close-btn">
                ×
              </button>
            </div>
            
            <div className="report-dialog-content">
              <p>Select the type of report you want to generate:</p>
              
              <div className="report-type-selector">
                <label className="report-type-option">
                  <input
                    type="radio"
                    name="reportType"
                    value="summary"
                    checked={reportType === "summary"}
                    onChange={(e) => setReportType(e.target.value)}
                  />
                  <div className="report-type-info">
                    <strong>Summary Report</strong>
                    <span className="report-type-desc">Brief overview with recent activity</span>
                  </div>
                </label>
                
                <label className="report-type-option">
                  <input
                    type="radio"
                    name="reportType"
                    value="detailed"
                    checked={reportType === "detailed"}
                    onChange={(e) => setReportType(e.target.value)}
                  />
                  <div className="report-type-info">
                    <strong>Detailed Report</strong>
                    <span className="report-type-desc">Complete log history with all host details</span>
                  </div>
                </label>
              </div>
              
              <div className="report-preview">
                <strong>Preview:</strong>
                <div className="preview-content">
                  {reportType === "summary" 
                    ? "Summary report will include total hosts, active hosts, and recent activity."
                    : "Detailed report will include all host information and complete log history."}
                </div>
              </div>
            </div>
            
            <div className="report-dialog-actions">
              <button onClick={handleReportDialogCancel} className="btn-cancel">
                Cancel
              </button>
              <button onClick={handleReportDialogConfirm} className="btn-confirm">
                Generate & Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
