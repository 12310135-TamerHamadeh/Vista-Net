import React, { useEffect, useState } from 'react'
import { SetDocumentTitle } from '../../Services/SetDocumentTitle';
import { Header, Content } from './Components';
import { useHosts } from '../../context/HostsContext';


SetDocumentTitle('Dashboard - Vista-net');

const Dashboard = () => {
  const { hosts, logs } = useHosts();

  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 20,
    showLabels: true,
    animationEnabled: true,
    darkMode: false,
    timeFormat: "24h",
    logLevel: "info",
  });

  return (
    <div className={`dashboard ${settings.darkMode ? "dark" : "light"}`}>
      <Header />
      <Content hosts={hosts} logs={logs} settings={settings} />
    </div>
  );
};

export default Dashboard;