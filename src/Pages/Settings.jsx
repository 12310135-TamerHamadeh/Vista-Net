"use client"

import { useState } from "react"
import "../Styles/Settings.css"

export default function SettingsModal({ open, onOpenChange, settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings)

  const updateSetting = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSettingsChange(localSettings)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setLocalSettings(settings)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      className="settings-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleCancel()
      }}
    >
      <div className="settings-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">⚙️</span>
            <h2 id="settings-title">Settings</h2>
          </div>
          <button onClick={handleCancel} className="close-btn" aria-label="Close settings">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-content">
          <section className="settings-section">
            <h3>Monitoring</h3>

            <div className="setting-item">
              <label htmlFor="autoRefresh" className="setting-label">
                <input
                  id="autoRefresh"
                  type="checkbox"
                  checked={localSettings.autoRefresh}
                  onChange={(e) => updateSetting("autoRefresh", e.target.checked)}
                />
                <span>Auto Refresh</span>
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="refreshInterval" className="setting-label">
                Refresh Interval (seconds)
              </label>
              <select
                id="refreshInterval"
                value={localSettings.refreshInterval}
                onChange={(e) => updateSetting("refreshInterval", Number.parseInt(e.target.value))}
                disabled={!localSettings.autoRefresh}
                className="setting-select"
              >
                <option value="1">1 second</option>
                <option value="2">2 seconds</option>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
              </select>
            </div>
          </section>

          <section className="settings-section">
            <h3>Display</h3>

            <div className="setting-item">
              <label htmlFor="showLabels" className="setting-label">
                <input
                  id="showLabels"
                  type="checkbox"
                  checked={localSettings.showLabels}
                  onChange={(e) => updateSetting("showLabels", e.target.checked)}
                />
                <span>Show Host Labels</span>
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="animationEnabled" className="setting-label">
                <input
                  id="animationEnabled"
                  type="checkbox"
                  checked={localSettings.animationEnabled}
                  onChange={(e) => updateSetting("animationEnabled", e.target.checked)}
                />
                <span>Enable Animations</span>
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="darkMode" className="setting-label">
                <input
                  id="darkMode"
                  type="checkbox"
                  checked={localSettings.darkMode}
                  onChange={(e) => updateSetting("darkMode", e.target.checked)}
                />
                <span>Dark Mode</span>
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="timeFormat" className="setting-label">
                Time Format
              </label>
              <select
                id="timeFormat"
                value={localSettings.timeFormat}
                onChange={(e) => updateSetting("timeFormat", e.target.value)}
                className="setting-select"
              >
                <option value="12h">12-Hour (AM/PM)</option>
                <option value="24h">24-Hour</option>
              </select>
            </div>
          </section>

          <section className="settings-section">
            <h3>Advanced</h3>

            <div className="setting-item">
              <label htmlFor="logLevel" className="setting-label">
                Log Level
              </label>
              <select
                id="logLevel"
                value={localSettings.logLevel}
                onChange={(e) => updateSetting("logLevel", e.target.value)}
                className="setting-select"
              >
                <option value="error">Error Only</option>
                <option value="warning">Warning & Error</option>
                <option value="info">All (Info, Warning, Error)</option>
              </select>
            </div>
          </section>
        </div>

        <div className="settings-actions">
          <button onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
