import { useEffect, useState } from "react";
import { X, Monitor } from "lucide-react";
import { addHost } from "../../api/AddHost";

const AddHostDialog = ({ open, onOpenChange, onHostAdded }) => {
  const [groups] = useState(["Network", "Office", "Production", "Default"]);
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    subnet_mask: "255.255.255.0",
    label: "",
    group: "Default",
  });

  const [saving, setSaving] = useState(false);

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const reset = () =>
    setFormData({
      name: "",
      ip: "",
      subnet_mask: "255.255.255.0",
      label: "",
      group: "Default",
    });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    if (!formData.name.trim() || !formData.ip.trim()) return;

    setSaving(true);
    const created = await addHost({
      name: formData.name.trim(),
      ip: formData.ip.trim(),
      subnet_mask: formData.subnet_mask?.trim() || "255.255.255.0",
      label: formData.label?.trim() || null,
      group: formData.group || null,
    });

    setSaving(false);

    if (!created) return;

    onHostAdded?.(created);

    reset();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-host-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        className="
          w-full max-w-xl overflow-hidden rounded-md
          border border-[#e0e0e0] bg-white
          dark:border-[#444] dark:bg-[#2a2a2a]
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b border-[#e0e0e0] dark:border-b-[#444]">
          <div className="flex items-center gap-3">
            <div
              className="
                h-9 w-9 rounded-md border
                bg-[#f8f8f8] border-[#e0e0e0]
                flex items-center justify-center
                dark:bg-[#333] dark:border-[#444]
              "
            >
              <Monitor className="h-4 w-4 text-[#4a90e2]" />
            </div>

            <div>
              <h2
                id="add-host-title"
                className="text-[16px] font-semibold text-[#333] dark:text-[#eee]"
              >
                Add Host
              </h2>
              <p className="mt-0.5 text-[12px] text-[#777] dark:text-[#bbb]">
                Add a new host to your monitored list
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="
              h-9 w-9 rounded border transition
              bg-[#e8e8e8] border-[#d0d0d0] hover:bg-[#d8d8d8]
              flex items-center justify-center
              dark:bg-[#333] dark:border-[#555] dark:hover:bg-[#404040]
            "
            aria-label="Close dialog"
          >
            <X className="h-4 w-4 text-[#333] dark:text-[#eee]" />
          </button>
        </div>

        <div className="p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[12px] font-semibold text-[#333] dark:text-[#eee]">
                Host Name
              </label>
              <input
                className="
                  mt-1 w-full rounded border px-3 py-2 text-[12px]
                  bg-white border-[#d0d0d0] text-[#333]
                  placeholder:text-[#999]
                  focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/40
                  dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                "
                placeholder="Server-01"
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#333] dark:text-[#eee]">
                IP Address
              </label>
              <input
                className="
                  mt-1 w-full rounded border px-3 py-2 text-[12px] font-mono
                  bg-white border-[#d0d0d0] text-[#333]
                  placeholder:text-[#999]
                  focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/40
                  dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                "
                placeholder="192.168.1.10"
                value={formData.ip}
                onChange={(e) => update("ip", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#333] dark:text-[#eee]">
                  Subnet Mask
                </label>
                <input
                  className="
                    mt-1 w-full rounded border px-3 py-2 text-[12px] font-mono
                    bg-white border-[#d0d0d0] text-[#333]
                    focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/40
                    dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                  "
                  value={formData.subnet_mask}
                  onChange={(e) => update("subnet_mask", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#333] dark:text-[#eee]">
                  Group
                </label>
                <select
                  className="
                    mt-1 w-full rounded border px-3 py-2 text-[12px]
                    bg-white border-[#d0d0d0] text-[#333]
                    focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/40
                    dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                  "
                  value={formData.group}
                  onChange={(e) => update("group", e.target.value)}
                >
                  {groups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#333] dark:text-[#eee]">
                Label (Optional)
              </label>
              <input
                className="
                  mt-1 w-full rounded border px-3 py-2 text-[12px]
                  bg-white border-[#d0d0d0] text-[#333]
                  focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/40
                  dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                "
                value={formData.label}
                onChange={(e) => update("label", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="
                  px-3 py-2 rounded border text-[12px]
                  bg-[#e8e8e8] border-[#d0d0d0] hover:bg-[#d8d8d8]
                  dark:bg-[#333] dark:border-[#555] dark:text-[#eee]
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className={[
                  "px-3 py-2 rounded text-[12px] text-white",
                  saving
                    ? "bg-[#4a90e2]/70 cursor-not-allowed"
                    : "bg-[#4a90e2] hover:bg-[#357abd]",
                ].join(" ")}
              >
                {saving ? "Adding..." : "Add Host"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHostDialog;
