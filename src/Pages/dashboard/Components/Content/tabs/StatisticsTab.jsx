import Logs from "../Logs.jsx";
import Statistics from "../Statistics.jsx";

const StatisticsTab = ({ hosts, logs }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-auto p-4 min-h-0">
        <div className="flex flex-col gap-4 h-full">
          <Statistics hosts={hosts} />

          <div>
            <h3 className="m-0 text-[16px] font-semibold text-[#333] dark:text-[#eee]">
              Logs
            </h3>
            <Logs logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
