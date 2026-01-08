import React, { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

import Popup from "../../shared/ui/Popup";

import { GetAllUsers } from "../../api/GetAllUsers";
import { addUser } from "../../api/AddUser";
import { deleteUser } from "../../api/DeleteUser.jsx"; 

const Settings = () => {

  const isAdmin = localStorage.getItem('role') === 'admin';

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const data = await GetAllUsers();
    if (data) setUsers(data);
    setLoadingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddPopup = () => {
    setForm({ name: "", email: "", password: "" });
    setIsAddOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddOpen(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setAdding(true);
    const created = await addUser(form);
    setAdding(false);

    if (!created) return;

    closeAddPopup();
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    const success = await deleteUser(id);
    if (!success) return;

    setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
  };

  if(!isAdmin){
    return (
      <div>
        Sorry Yuu dont have access
      </div>
    )
  }

  
  return (
    <div className="p-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            disabled={loadingUsers}
          >
            <RefreshCw size={16} className={loadingUsers ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            onClick={openAddPopup}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* list */}
      <div className="mt-6 overflow-hidden rounded-xl border bg-white">
        <div className="grid grid-cols-12 gap-3 border-b bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-600">
          <div className="col-span-4">Name</div>
          <div className="col-span-6">Email</div>
          <div className="col-span-1">Role</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {loadingUsers ? (
          <div className="p-6 text-sm text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No users found.</div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="grid grid-cols-12 gap-3 border-b px-4 py-3 text-sm">
              <div className="col-span-4 font-medium">{u.name}</div>
              <div className="col-span-6">{u.email}</div>
              <div className="col-span-1">{u.Role || u.role || "user"}</div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="rounded-lg border px-3 py-1.5 text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  title="Delete user"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Popup open={isAddOpen} onClose={closeAddPopup} title="Add User" maxWidth="max-w-md">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. John"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeAddPopup}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={adding}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
            >
              {adding ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};

export default Settings;
