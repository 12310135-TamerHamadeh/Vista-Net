"use client"

import { useState } from "react"
import AddHostDialog from "./AddHostDialog"
import "../Styles/HostsSidebar.css"

export default function HostsSidebar({ hosts, onAddHost, onDeleteHost, selectedHost, onSelectHost }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const groupedHosts = hosts.reduce((acc, host) => {
    const network = host.networkRange || "Ungrouped"
    if (!acc[network]) acc[network] = []
    acc[network].push(host)
    return acc
  }, {})

  const handleDeleteClick = (ip, e) => {
    e.stopPropagation()
    if (deleteMode) {
      onDeleteHost(ip)
      if (selectedHost === ip) onSelectHost(null)
    }
  }

  return (
    <>
      <div className="hosts-sidebar">
        <div className="sidebar-header">
          <h2>Hosts</h2>
          <div className="sidebar-actions">
            <button className="sidebar-btn add-btn" onClick={() => setDialogOpen(true)} title="Add new host">
              <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              className={`sidebar-btn delete-btn ${deleteMode ? "active" : ""}`}
              onClick={() => setDeleteMode(!deleteMode)}
              title={deleteMode ? "Cancel delete mode" : "Enable delete mode"}
            >
              <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar-content">
          {Object.keys(groupedHosts).length === 0 ? (
            <div className="empty-state">
              <p>No hosts added yet!</p>
              <button className="btn-add-first" onClick={() => setDialogOpen(true)}>
                Add First Host
              </button>
            </div>
          ) : (
            Object.entries(groupedHosts).map(([network, networkHosts]) => (
              <div key={network} className="network-group">
                <div className="network-label">{network}</div>
                <div className="hosts-list">
                  {networkHosts.map((host) => {
                    const isActive = host.activity === "Active"
                    const isSelected = selectedHost === host.ip

                    return (
                      <div
                        key={host.ip}
                        className={`host-item ${isSelected ? "selected" : ""} ${deleteMode ? "delete-mode" : ""}`}
                        onClick={() => onSelectHost(isSelected ? null : host.ip)}
                      >
                        <div className="host-info">
                          <div className="host-name">{host.name}</div>
                          <div className="host-ip">{host.ip}</div>
                          {host.label && <div className="host-label">{host.label}</div>}
                        </div>

                        <div className="host-status">
                          <svg
                            className={`status-indicator ${isActive ? "active" : "inactive"}`}
                            viewBox="0 0 24 24"
                            width="8"
                            height="8"
                          >
                            <circle cx="12" cy="12" r="8" fill={isActive ? "#22c55e" : "#ef4444"} />
                          </svg>
                        </div>

                        {deleteMode && (
                          <button
                            className="delete-icon"
                            onClick={(e) => handleDeleteClick(host.ip, e)}
                            title="Delete host"
                          >
                            <svg className="icon" viewBox="0 0 24 24" width="14" height="14">
                              <path
                                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="host-count">
            Total: {hosts.length} | Active: {hosts.filter((h) => h.activity === "Active").length}
          </div>
        </div>
      </div>

      <AddHostDialog open={dialogOpen} onOpenChange={setDialogOpen} onAddHost={onAddHost} />
    </>
  )
}
