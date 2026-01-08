import { useEffect, useMemo, useRef, useState } from "react";
import RibbonButton from "./RibbonButton";
import { Play, Square, Pause, RotateCw, FileText, Settings } from "lucide-react";
import { useHosts } from "../../context/HostsContext";
import { useLocation, Link } from "react-router-dom";

export default function Ribbon({ onGenerate, onSettings }) {
  const { refreshAll } = useHosts();

  const location = useLocation();
  const publicRoutes = ['/login', '/settings'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  const [status, setStatus] = useState("idle");
  const intervalRef = useRef(null);

  const canStart = status === "idle";
  const canStop = status !== "idle";
  const canPause = status === "running";
  const canResume = status === "paused";

  const startLabel = useMemo(() => {
    if (status === "running") return "Running...";
    if (status === "paused") return "Paused";
    return "Start";
  }, [status]);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    if (intervalRef.current) return;

    refreshAll();

    intervalRef.current = setInterval(() => {
      refreshAll();
    }, 20000);
  };

  const handleStart = () => {
    setStatus("running");
    startInterval();
  };

  const handleStop = () => {
    stopInterval();
    setStatus("idle");
  };

  const handlePause = () => {
    stopInterval();
    setStatus("paused");
  };

  const handleResume = () => {
    setStatus("running");
    startInterval();
  };

  const generateReport = () => {
    window.open(
      "http://localhost/Vista-net/api/Reports/GenerateReport.php?hours=24&log_limit=200",
      "_blank"
    );
  };

  useEffect(() => () => stopInterval(), []);

  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-gradient-to-br from-zinc-100 to-white shadow-sm
                    dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 ${isPublicRoute ? 'hidden' : ''}`}>
      <div className="flex items-center gap-2">
        <RibbonButton id="btnStart" icon={Play} onClick={handleStart} disabled={!canStart}>
          {startLabel}
        </RibbonButton>

        <RibbonButton id="btnStop" icon={Square} onClick={handleStop} disabled={!canStop}>
          Stop
        </RibbonButton>

        <RibbonButton id="btnPause" icon={Pause} onClick={handlePause} disabled={!canPause}>
          Pause
        </RibbonButton>

        <RibbonButton id="btnResume" icon={RotateCw} onClick={handleResume} disabled={!canResume}>
          Resume
        </RibbonButton>

        <RibbonButton
          id="btnGenerate"
          icon={FileText}
          onClick={generateReport}
          variant="primary"
          disabled={status === "running"}
        >
          Generate Report
        </RibbonButton>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/settings">
          <RibbonButton id="btnSettings" icon={Settings} onClick={() => onSettings?.()}>
              Settings
          </RibbonButton>
        </Link>
        <div className="ml-3 text-xs font-semibold text-zinc-500 dark:text-zinc-300">
          Vista-Net
        </div>
      </div>
    </div>
  );
}
