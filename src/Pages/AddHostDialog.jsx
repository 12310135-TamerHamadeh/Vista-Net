"use client"

import { useState, useEffect } from "react"
import "../Styles/AddHostDialog.css"

export default function AddHostDialog({ open, onOpenChange, onAddHost }) {
  const [mode, setMode] = useState("single")
  const [errors, setErrors] = useState([])
  const [groups] = useState(["Default", "Office", "Lab", "Production"])
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    startIp: "",
    endIp: "",
    subnetMask: "255.255.255.0",
    dns: "",
    label: "",
    group: "Default",
    description: "",
    dynamicIp: false,
    resolveHostname: false,
    doNotAddIfNotResolved: false,
    startMonitoring: true,
  })

  const ipPattern = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/
  const namePattern = /^[A-Za-z0-9\-_.]+$/

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  const updateFormData = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }))

  const validateForm = () => {
    const newErrors = []

    if (!formData.name.trim()) {
      newErrors.push("Host name is required")
    } else if (!namePattern.test(formData.name)) {
      newErrors.push("Host name must contain only letters, numbers, hyphens, underscores, or dots")
    }

    if (mode === "single") {
      if (!ipPattern.test(formData.ip)) {
        newErrors.push("The 'Address' field should contain a valid IP address.")
      }
    } else {
      if (!ipPattern.test(formData.startIp)) {
        newErrors.push("The 'Start IP' field should contain a valid IP address.")
      }
      if (!ipPattern.test(formData.endIp)) {
        newErrors.push("The 'End IP' field should contain a valid IP address.")
      }
    }

    if (!ipPattern.test(formData.subnetMask)) {
      newErrors.push("The 'Subnet Mask' field should contain a valid IP address.")
    }

    if (formData.dns && !ipPattern.test(formData.dns)) {
      newErrors.push("The 'DNS' field should contain a valid IP address.")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const resetForm = () =>
    setFormData({
      name: "",
      ip: "",
      startIp: "",
      endIp: "",
      subnetMask: "255.255.255.0",
      dns: "",
      label: "",
      group: "Default",
      description: "",
      dynamicIp: false,
      resolveHostname: false,
      doNotAddIfNotResolved: false,
      startMonitoring: true,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const hostData = {
      name: formData.name,
      ip: mode === "single" ? formData.ip : `${formData.startIp} - ${formData.endIp}`,
      activity: "Active",
      networkRange: formData.subnetMask,
      dns: formData.dns || undefined,
      label: formData.label || undefined,
      group: formData.group,
      description: formData.description || undefined,
      dynamicIp: !!formData.dynamicIp,
      resolveHostname: !!formData.resolveHostname,
      startMonitoring: !!formData.startMonitoring,
    }

    onAddHost(hostData)
    resetForm()
    setErrors([])
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      className="emco-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-host-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      <div className="emco-dialog max-w-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="emco-dialog-header">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="3" width="20" height="18" rx="2" />
            </svg>
            <div>
              <h2 id="add-host-title">Add Host</h2>
              <p className="text-xs text-muted-foreground mt-1">Specify Monitored Host Information</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="emco-close-btn"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {errors.length > 0 && (
          <div className="emco-error-section" role="alert" aria-live="polite">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
              <circle cx="12" cy="16" r="1" fill="white" />
            </svg>
            <div>
              {errors.map((err, idx) => (
                <div key={idx} className="text-sm text-red-700">
                  {err}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="emco-form">
          <div className="form-group">
            <label htmlFor="hostName" className="emco-label">
              Host Name
            </label>
            <input
              id="hostName"
              className="emco-input"
              placeholder="e.g., Server-01, Router, Workstation"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
            />
          </div>

          <div className="emco-mode-selector">
            <label className="mode-option">
              <input
                type="radio"
                name="mode"
                value="single"
                checked={mode === "single"}
                onChange={() => setMode("single")}
              />
              <span>Add Single Host</span>
            </label>

            <label className="mode-option">
              <input
                type="radio"
                name="mode"
                value="range"
                checked={mode === "range"}
                onChange={() => setMode("range")}
              />
              <span>Add Hosts Range</span>
            </label>
          </div>

          {mode === "single" ? (
            <div className="form-group">
              <label htmlFor="address" className="emco-label">
                Address
              </label>
              <input
                id="address"
                className="emco-input"
                placeholder="192.168.1.100"
                value={formData.ip}
                onChange={(e) => updateFormData("ip", e.target.value)}
              />

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="dynamicIp"
                  checked={formData.dynamicIp}
                  onChange={(e) => updateFormData("dynamicIp", e.target.checked)}
                />
                <label htmlFor="dynamicIp" className="checkbox-label">
                  This host uses a dynamic IP address
                </label>
              </div>
            </div>
          ) : (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startIp" className="emco-label">
                  Start IP
                </label>
                <input
                  id="startIp"
                  className="emco-input"
                  placeholder="192.168.1.1"
                  value={formData.startIp}
                  onChange={(e) => updateFormData("startIp", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endIp" className="emco-label">
                  End IP
                </label>
                <input
                  id="endIp"
                  className="emco-input"
                  placeholder="192.168.1.255"
                  value={formData.endIp}
                  onChange={(e) => updateFormData("endIp", e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subnetMask" className="emco-label">
                Subnet Mask
              </label>
              <input
                id="subnetMask"
                className="emco-input"
                placeholder="255.255.255.0"
                value={formData.subnetMask}
                onChange={(e) => updateFormData("subnetMask", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dns" className="emco-label">
                DNS
              </label>
              <input
                id="dns"
                className="emco-input"
                placeholder="8.8.8.8"
                value={formData.dns}
                onChange={(e) => updateFormData("dns", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="label" className="emco-label">
                Label
              </label>
              <input
                id="label"
                className="emco-input"
                placeholder="e.g., Router, Server, Workstation"
                value={formData.label}
                onChange={(e) => updateFormData("label", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="group" className="emco-label">
                Group
              </label>
              <select
                id="group"
                className="emco-input emco-select"
                value={formData.group}
                onChange={(e) => updateFormData("group", e.target.value)}
              >
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="emco-label">
              Description
            </label>
            <textarea
              id="description"
              className="emco-textarea"
              rows={4}
              placeholder="Enter host description..."
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
            />
          </div>

          <div className="emco-checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="resolveHostname"
                checked={formData.resolveHostname}
                onChange={(e) => updateFormData("resolveHostname", e.target.checked)}
              />
              <label htmlFor="resolveHostname" className="checkbox-label">
                Resolve address to host name
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                id="doNotAddIfNotResolved"
                checked={formData.doNotAddIfNotResolved}
                onChange={(e) => updateFormData("doNotAddIfNotResolved", e.target.checked)}
              />
              <label htmlFor="doNotAddIfNotResolved" className="checkbox-label">
                Do not add if not resolved
              </label>
            </div>

            <div className="checkbox-item">
              <input
                type="checkbox"
                id="startMonitoring"
                checked={formData.startMonitoring}
                onChange={(e) => updateFormData("startMonitoring", e.target.checked)}
              />
              <label htmlFor="startMonitoring" className="checkbox-label">
                Start monitoring when added
              </label>
            </div>
          </div>

          <div className="emco-actions">
            <button
              type="button"
              className="emco-btn emco-btn-cancel"
              onClick={() => {
                resetForm()
                setErrors([])
                onOpenChange(false)
              }}
            >
              Cancel
            </button>
            <button type="submit" className="emco-btn emco-btn-add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
