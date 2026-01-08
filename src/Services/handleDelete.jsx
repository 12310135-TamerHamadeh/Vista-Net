import { deleteHost } from "../api/DeleteHost";

export const handleDeleteHost = async (
  id,
  ip,
  e,
  selectedHost,
  setHosts,
  setSelectedHost
) => {
  e.stopPropagation();

  const ok = await deleteHost(id);
  if (!ok) return;

  setHosts((prev) => prev.filter((h) => String(h.id) !== String(id)));

  if (selectedHost === ip) {
    setSelectedHost("");
  }
};
