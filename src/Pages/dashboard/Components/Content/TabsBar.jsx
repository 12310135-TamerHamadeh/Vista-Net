const TabsBar = ({ activeTab, setActiveTab }) => {
  const tabs = ["statistics", "alerts", "state", "topology"];

  return (
    <div className="flex gap-0 border-b border-[#e0e0e0] bg-[#fafafa] hrink-0 dark:border-[#444] dark:bg-[#2a2a2a]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-4 py-3 text-[13px] font-medium transition border-b-2",
              "border-b-transparent text-[#666] hover:text-[#333] hover:bg-[#f0f0f0]",
              "dark:text-[#aaa] dark:hover:text-[#eee] dark:hover:bg-[#333]",
              isActive ? "text-[#4a90e2] border-b-[#4a90e2]" : "",
            ].join(" ")}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        );
      })}

      <div className="flex-1" />

      <button
        id="btnRefresh"
        className={[
          "px-4 py-3 text-[13px] font-medium transition border-b-2 border-b-transparent",
          "text-[#666] hover:text-[#333] hover:bg-[#f0f0f0]",
          "dark:text-[#aaa] dark:hover:text-[#eee] dark:hover:bg-[#333]",
        ].join(" ")}
      >
        Refresh
      </button>
    </div>
  );
};

export default TabsBar;
