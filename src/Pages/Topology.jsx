
"use client"

import { useState } from "react"
import "../Styles/Topology.css"

export default function Topology({ hosts, settings = {} }) {
  const [hoveredHost, setHoveredHost] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Group hosts by network (subnet)
  const groupHostsByNetwork = () => {
    const groups = {}
    
    hosts.forEach(host => {
      const network = host.networkRange || "Default Network"
      if (!groups[network]) {
        groups[network] = []
      }
      groups[network].push(host)
    })
    
    return groups
  }

  // Find gateway/router in a network group
  const findGateway = (networkHosts) => {
    return networkHosts.find(h => 
      h.label?.toLowerCase().includes('gateway') || 
      h.label?.toLowerCase().includes('router') ||
      h.name.toLowerCase().includes('router') ||
      h.ip === '192.168.1.1' || h.ip.endsWith('.1')
    ) || networkHosts[0]
  }

  // Find regular hosts (non-gateway)
  const findRegularHosts = (networkHosts, gateway) => {
    return networkHosts.filter(h => h !== gateway)
  }

  // Handle mouse hover
  const handleMouseEnter = (host, e) => {
    setHoveredHost(host)
    setTooltipPos({
      x: e.clientX + 10,
      y: e.clientY + 10
    })
  }

  const handleMouseLeave = () => {
    setHoveredHost(null)
  }

  const handleMouseMove = (e) => {
    if (hoveredHost) {
      setTooltipPos({
        x: e.clientX + 10,
        y: e.clientY + 10
      })
    }
  }

  const networkGroups = groupHostsByNetwork()

  return (
    <div 
      className="topology-wrapper"
      onMouseMove={handleMouseMove}
    >
      <div className="topo-container">
        <div className="multi-tree-container">
          {Object.entries(networkGroups).map(([network, networkHosts]) => {
            const gateway = findGateway(networkHosts)
            const regularHosts = findRegularHosts(networkHosts, gateway)
            
            return (
              <div key={network} className="single-tree">
                {/* Network Label */}
                <div className="tree-label">{network}</div>
                
                {/* Gateway/Router Level */}
                <div className="tree-level gateway-level">
                  <div 
                    className={`gateway-node ${gateway.activity === 'Active' ? 'active' : 'inactive'}`}
                    onMouseEnter={(e) => handleMouseEnter(gateway, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="gateway-name">{gateway.name}</div>
                    <div className="gateway-ip">{gateway.ip}</div>
                    <div 
                      className={`gateway-status ${gateway.activity === 'Active' ? 'active' : 'inactive'}`}
                    />
                  </div>
                </div>
                
                {/* Connection from Gateway to Hosts */}
                {regularHosts.length > 0 && (
                  <div className="connections-container">
                    <div className="main-vertical"></div>
                  </div>
                )}
                
                {/* Hosts Level */}
                {regularHosts.length > 0 && (
                  <div className="tree-level host-level">
                    {regularHosts.map((host, index) => (
                      <div key={host.ip} style={{ position: 'relative' }}>
                        {/* Connection line to this host */}
                        <div className="connection-line vertical-line"></div>
                        
                        {/* Host Node */}
                        <div 
                          className={`host-node ${host.activity === 'Active' ? 'active' : 'inactive'}`}
                          onMouseEnter={(e) => handleMouseEnter(host, e)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="host-name">{host.name}</div>
                          <div className="host-ip">{host.ip}</div>
                          <div 
                            className={`host-status ${host.activity === 'Active' ? 'active' : 'inactive'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Simple Tooltip */}
      {hoveredHost && (
        <div 
          className="topo-tooltip visible"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
          }}
        >
          <strong>{hoveredHost.name}</strong>
          <div>IP: {hoveredHost.ip}</div>
          {hoveredHost.label && <div>Type: {hoveredHost.label}</div>}
          {hoveredHost.networkRange && <div>Network: {hoveredHost.networkRange}</div>}
          <div className={`status ${hoveredHost.activity === 'Active' ? 'active' : 'inactive'}`}>
            {hoveredHost.activity === 'Active' ? 'ACTIVE' : 'INACTIVE'}
          </div>
        </div>
      )}
    </div>
  )
}
