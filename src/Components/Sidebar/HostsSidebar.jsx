import { useEffect, useMemo, useState } from "react";
import { Header, HostsContent, Footer } from "./Components";
import { useHosts } from "../../context/HostsContext.jsx";
import { useLocation } from "react-router-dom";

export default function HostsSidebar() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedHost, setSelectedHost] = useState("192.168.1.10");

  const { hosts, setHosts } = useHosts(); 
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const publicRoutes = ['/login', '/settings'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    setLoading(false);
  }, [hosts]);

  const groupedHosts = useMemo(() => {
    return (hosts ?? []).reduce((acc, host) => {
      const network = host.subnet_mask || "Ungrouped";
      if (!acc[network]) acc[network] = [];
      acc[network].push(host);
      return acc;
    }, {});
  }, [hosts]);

  const activeCount = useMemo(
    () => (hosts ?? []).filter((h) => h.activity === "Active").length,
    [hosts]
  );

  return (
    <div
      className={`
        w-[280px] h-[calc(100vh-60px)] overflow-hidden flex flex-col
        bg-[#f8f8f8] border-r border-[#e0e0e0]
        dark:bg-[#2a2a2a] dark:border-r-[#444]
        ${isPublicRoute ? 'hidden' : ''}
      `}
    >
      <Header deleteMode={deleteMode} setDeleteMode={setDeleteMode} />

      <HostsContent
        loading={loading}
        hosts={hosts}
        groupedHosts={groupedHosts}
        deleteMode={deleteMode}
        selectedHost={selectedHost}
        setSelectedHost={setSelectedHost}
        setHosts={setHosts}
      />

      <Footer hosts={hosts} activeCount={activeCount} />
    </div>
  );
}
