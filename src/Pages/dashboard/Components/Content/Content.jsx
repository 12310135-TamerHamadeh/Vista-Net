import { useState } from "react";
import TabsBar from "./TabsBar";

import { AlertsTab, StateTab, StatisticsTab, TopologyTab } from "./tabs";

const Content = ({ logs = [], addLog, hosts = [], settings }) => {
  const [activeTab, setActiveTab] = useState("statistics");

  return (
    <section className="flex-1 flex flex-col bg-white dark:bg-[#1f1f1f] overflow-hidden h-full">
      <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "statistics" && <StatisticsTab hosts={hosts} logs={logs} />}
      {activeTab === "alerts" && <AlertsTab logs={logs} addLog={addLog} />}
      {activeTab === "state" && <StateTab hosts={hosts} />}
      {activeTab === "topology" && <TopologyTab hosts={hosts} settings={settings} />}
    </section>
  );
};

export default Content;