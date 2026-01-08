import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Popup } from "../../../shared/ui";
import AddHostDialog from "../AddHostDialog";

export const Header = ({ deleteMode, setDeleteMode }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const isAdmin = localStorage.getItem('role') === 'admin' 

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] dark:border-b-[#444]">
        <h2 className="m-0 text-[16px] font-semibold text-[#333] dark:text-[#eee]">
          Hosts
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            title="Add new host"
            onClick={() => setOpenAdd(true)}
            className={`px-2 py-1.5 rounded border cursor-pointer transition
              bg-[#e8e8e8] border-[#d0d0d0] hover:bg-[#d8d8d8]
              flex items-center justify-center ${isAdmin ? '' : "hidden"}`}
          >
            <Plus className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setDeleteMode((v) => !v)}
            title={deleteMode ? "Cancel delete mode" : "Enable delete mode"}
            
            className={`px-2 py-1.5 rounded border cursor-pointer transition flex items-center justify-center 
              ${deleteMode ? "bg-[#ffcccc] border-[#ff9999]" : "bg-[#e8e8e8] border-[#d0d0d0] hover:bg-[#d8d8d8]"} ${isAdmin ? '' : "hidden"}`}
          >
            <Trash2 className={`h-4 w-4 `} />
          </button>
        </div>
      </div>

      <Popup open={openAdd} onClose={() => setOpenAdd(false)} title="Add Host" maxWidth="max-w-xl">
        <AddHostDialog open={openAdd} onOpenChange={setOpenAdd} onHostAdded={(newHost) => setHosts((prev) => [newHost, ...prev])} />
      </Popup>
    </>
  );
};