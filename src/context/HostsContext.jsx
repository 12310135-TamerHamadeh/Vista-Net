import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { getHosts } from "../api/GetHosts";
import { CheckHosts } from "../api/CheckHosts";
import { getLogs  } from "../api/GetLogs.jsx";


const HostsContext = createContext(null);

export const HostsProvider = ({ children }) => {
  const [hosts, setHosts] = useState([]);
  const [logs, setLogs] = useState([]);

  const fetchHosts = useCallback(async () => {
    const data = await getHosts();
    if (data) setHosts(data);
  }, []);

  const fetchLogs = useCallback(async () => {
    const data = await getLogs();
    if (data) setLogs(data);
  }, []);

  const refreshAll = useCallback(async () => {
    await CheckHosts();     // pings + updates DB + inserts logs
    await fetchHosts();     // pull latest hosts into React state
    await fetchLogs();      // pull latest logs into React state
  }, [fetchHosts, fetchLogs]);

  useEffect(() => {
    fetchHosts();
    fetchLogs();
  }, [fetchHosts, fetchLogs]);

  return (
    <HostsContext.Provider value={{ hosts, logs, refreshAll, setHosts, setLogs }}>
      {children}
    </HostsContext.Provider>
  );
};

export const useHosts = () => {
  const ctx = useContext(HostsContext);
  if (!ctx) throw new Error("useHosts must be used inside HostsProvider");
  return ctx;
};