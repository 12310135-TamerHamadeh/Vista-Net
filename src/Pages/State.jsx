"use client"

import { useEffect, useState } from "react"
import "../Styles/State.css"

export default function State({ hosts }) {
  const [states, setStates] = useState([])

  useEffect(() => {
    const newStates = hosts.map((host) => ({
      name: host.name,
      ip: host.ip,
      status: host.activity || "Down",
      time: new Date().toLocaleTimeString(),
    }))
    setStates(newStates)
  }, [hosts])

  return (
    <div className="state-grid">
      {states.length === 0 ? (
        <p>No hosts yet.</p>
      ) : (
        states.map((state, idx) => (
          <div key={idx} className={`state-box ${state.status === "Active" ? "up" : "down"}`}>
            <div className="state-name">{state.name}</div>
            <div className="state-ip">{state.ip}</div>
            <div className="state-time">
              {state.status === "Active" ? "Up since" : "Down since"} {state.time}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
