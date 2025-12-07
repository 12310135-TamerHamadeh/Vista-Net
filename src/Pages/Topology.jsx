"use client"

import { useRef, useEffect, useState } from "react"
import "../Styles/Topology.css"

function getSubnet(ip, networkRange) {
  if (networkRange) return networkRange
  const parts = ip.trim().split(".")
  if (parts.length === 4) {
    return parts.slice(0, 3).join(".") + ".0/24"
  }
  return null
}

export default function Topology({ hosts, settings = {} }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 800, h: 600 })
  const [positions, setPositions] = useState({})

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const updateSize = () => {
      const r = node.getBoundingClientRect()
      setSize({ w: Math.max(400, r.width), h: Math.max(300, r.height) })
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    if (hosts.length === 0) return

    const newPositions = {}
    const networkGroups = {}

    hosts.forEach((host) => {
      const subnet = getSubnet(host.ip, host.networkRange)
      if (!networkGroups[subnet]) {
        networkGroups[subnet] = []
      }
      networkGroups[subnet].push(host)
    })

    let yOffset = 80
    Object.keys(networkGroups).forEach((subnet) => {
      const groupHosts = networkGroups[subnet]
      const mainHost = groupHosts[0]
      const childHosts = groupHosts.slice(1)

      newPositions[mainHost.name] = {
        x: size.w / 2,
        y: yOffset,
        host: mainHost,
      }

      const arcRadius = 100
      const arcWidth = Math.min(300, size.w - 100)
      const startX = size.w / 2 - arcWidth / 2

      if (childHosts.length === 1) {
        newPositions[childHosts[0].name] = {
          x: size.w / 2,
          y: yOffset + 140,
          host: childHosts[0],
        }
      } else if (childHosts.length > 1) {
        childHosts.forEach((host, idx) => {
          const xPosition = startX + (arcWidth / (childHosts.length - 1)) * idx
          newPositions[host.name] = {
            x: xPosition,
            y: yOffset + 140,
            host: host,
          }
        })
      }

      yOffset += 250
    })

    setPositions(newPositions)
  }, [hosts, size])

  const connections = []
  const networkGroups = {}

  hosts.forEach((host) => {
    const subnet = getSubnet(host.ip, host.networkRange)
    if (!networkGroups[subnet]) {
      networkGroups[subnet] = []
    }
    networkGroups[subnet].push(host)
  })

  Object.keys(networkGroups).forEach((subnet) => {
    const groupHosts = networkGroups[subnet]
    const mainHost = groupHosts[0]
    const childHosts = groupHosts.slice(1)

    childHosts.forEach((childHost) => {
      const mainPos = positions[mainHost.name]
      const childPos = positions[childHost.name]

      if (mainPos && childPos) {
        connections.push({
          id: `${mainHost.name}-${childHost.name}`,
          from: mainPos,
          to: childPos,
        })
      }
    })
  })

  const animationEnabled = settings.animationEnabled !== false
  const showLabels = settings.showLabels !== false

  return (
    <div className="topology-wrapper" ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg className="topo-svg" width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`}>
        {connections.map((conn) => (
          <line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
        ))}

        {hosts.map((host) => {
          const pos = positions[host.name]
          if (!pos) return null

          const isActive = host.activity === "Active" || host.status === "active"
          const nodeWidth = 100
          const nodeHeight = 50

          return (
            <g key={host.name} className="topo-node-group">
              <rect
                x={pos.x - nodeWidth / 2}
                y={pos.y - nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight}
                className={`topo-node ${isActive ? "active" : "inactive"}`}
                rx="6"
                ry="6"
              />

              {showLabels && (
                <text x={pos.x - 30} y={pos.y - 8} className="topo-label topo-name" fontSize="12" fontWeight="600">
                  {host.name}
                </text>
              )}

              {showLabels && (
                <text x={pos.x - 30} y={pos.y + 12} className="topo-label topo-ip" fontSize="10" fontFamily="monospace">
                  {host.ip}
                </text>
              )}

              <g className="topo-indicator">
                {isActive && animationEnabled && (
                  <circle
                    cx={pos.x + 40}
                    cy={pos.y - 20}
                    r="6"
                    className="topo-pulse-ring"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                )}

                <circle
                  cx={pos.x + 40}
                  cy={pos.y - 20}
                  r="4"
                  className={`topo-status-dot ${isActive ? "active" : "inactive"}`}
                  fill={isActive ? "#22c55e" : "#ef4444"}
                />
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
