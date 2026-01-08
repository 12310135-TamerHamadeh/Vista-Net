import Logs from "../Logs";

const AlertsTab = ({ logs, addLog }) => {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-auto min-h-0">
      {/* Logs block */}
      <div className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-md p-4 flex flex-col overflow-hidden min-h-0 dark:bg-[#2a2a2a] dark:border-[#444]">
        <div className="font-semibold mb-3 text-[#333] shrink-0 dark:text-[#eee]">
          Logs
        </div>
        <div className="flex-1 overflow-auto min-h-0">
          <Logs logs={logs} />
        </div>
      </div>

      {/* AI block */}
      <div className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-md p-4 flex flex-col overflow-hidden min-h-0 dark:bg-[#2a2a2a] dark:border-[#444]">
        <div className="font-semibold mb-3 text-[#333] shrink-0 dark:text-[#eee]">
          AI Suggestion
        </div>

        <button
          className="px-3 py-2 rounded text-[12px] text-white bg-[#4a90e2] hover:bg-[#357abd] w-fit"
          onClick={() => addLog("AI suggestion requested")}
        >
          Suggest AI
        </button>

        <div className="mt-3 p-3 bg-white border border-[#e0e0e0] rounded min-h-[100px] text-[13px] leading-[1.5] dark:bg-[#1f1f1f] dark:border-[#444] dark:text-[#ccc]">
          Tap "Suggest AI" to get advice.
        </div>
      </div>
    </div>
  );
};

export default AlertsTab;
