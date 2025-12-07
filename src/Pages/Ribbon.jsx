"use client"

import "../Styles/Ribbon.css"

export default function Ribbon({
  onStart,
  onStop,
  onPause,
  onResume,
  onGenerate,
  onHostAdd,
  onHostDelete,
  onSettings,
}) {
  return (
    <div className="ribbon">
      <div className="ribbon-left">
        <button id="btnStart" className="ribbon-btn" onClick={onStart}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          <span> {/* TODO: START THE PINGING PROGRESS */} Start</span> 
        </button>

        <button id="btnStop" className="ribbon-btn" onClick={onStop}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <rect x="6" y="6" width="12" height="12" />
          </svg>
          <span>Stop</span>
        </button>

        <button id="btnPause" className="ribbon-btn" onClick={onPause}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <rect x="6" y="5" width="3" height="14" />
            <rect x="15" y="5" width="3" height="14" />
          </svg>
          <span>Pause</span>
        </button>

        <button id="btnResume" className="ribbon-btn" onClick={onResume}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <path d="M10 8v8l6-4z" />
          </svg>
          <span>Resume</span>
        </button>

        <button id="btnGenerate" className="ribbon-btn primary" onClick={onGenerate}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <path d="M3 6h18v2H3zM3 11h12v2H3zM3 16h18v2H3z" />
          </svg>
          <span>Generate Report</span>
        </button>

      </div>

      <div className="ribbon-right">
        <button id="btnSettings" className="ribbon-btn" onClick={onSettings}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 8.6A3.4 3.4 0 1 0 15.4 12 3.4 3.4 0 0 0 12 8.6Z" />
          </svg>
          <span>Settings</span>
        </button>
        <div className="ribbon-meta">Vista-Net</div>
      </div>
    </div>
  )
}
