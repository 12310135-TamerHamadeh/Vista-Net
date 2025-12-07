"use client"

import { useState, useRef } from "react"
import Ribbon from "./Ribbon"
import HostsSidebar from "./HostsSidebar"
import SettingsModal from "./Settings"
import Content from "./Content"
import { pingService } from "../lib/ping-service.ts"

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
  const [deleteMode, setDeleteMode] = useState(false)
  const [logs, setLogs] = useState([])

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
    pingService.startPinging(hosts, settings.refreshInterval * 1000)

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
    pingService.stopPinging()
    addLog("Pinging stopped")
  }

  const pausePinging = () => {
    paused.current = true
    pingService.pausePinging()
    addLog("Pinging paused")
  }

  const resumePinging = () => {
    paused.current = false
    pingService.resumePinging(hosts, settings.refreshInterval * 1000)
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
    setDeleteMode(false)
  }

  const handleGenerate = () => {
    const detailed = window.confirm("Detailed report? OK = Yes, Cancel = Summary")
    addLog(`Generated ${detailed ? "detailed" : "summary"} report`)
    generateReport(logs, detailed ? "detailed" : "summary")
  }

  const generateReport = (logData, type) => {
    try {
      const reportText = `Vista-Net Report\n${type === "summary" ? "Summary" : "Detailed"}\n\nTotal Logs: ${logData.length}\n\n${
        type === "summary" ? `First: ${logData[0]}\nLast: ${logData[logData.length - 1]}` : logData.join("\n")
      }`

      const blob = new Blob([reportText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `VistaNet_Report_${type}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Report generation error:", error)
    }
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
        onGenerate={handleGenerate}
        onHostAdd={() => {}}
        onHostDelete={() => setDeleteMode(!deleteMode)}
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
    </div>
  )
}
