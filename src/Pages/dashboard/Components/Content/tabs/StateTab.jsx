import State from "../State.jsx";

const StateTab = ({ hosts }) => {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
      <div className="font-bold mb-2.5 flex-shrink-0 text-[16px] text-[#333] dark:text-[#eee]">
        Device States
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        <State hosts={hosts} />
      </div>
    </div>
  );
};

export default StateTab;
