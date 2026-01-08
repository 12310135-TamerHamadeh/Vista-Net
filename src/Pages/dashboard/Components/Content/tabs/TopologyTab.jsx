import Topology from "../Topology.jsx";

const TopologyTab = ({ hosts, settings }) => {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
      <div className="font-bold mb-2.5 shrink-0 text-[16px] text-[#333] dark:text-[#eee]">
        Network Topology
      </div>

      <div className="flex-1 w-full bg-[#fafafa] border border-[#e0e0e0] rounded-md overflow-hidden min-h-0 dark:bg-[#2a2a2a] dark:border-[#444]">
        <Topology hosts={hosts} settings={settings} />
      </div>
    </div>
  );
};

export default TopologyTab;
