import toast, { Toaster } from "react-hot-toast";
import { useChatStore } from "../hooks/useChatStore";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/UI/DarkModeToggle";
import { useDarkModeStore } from "../hooks/useDarkModeStore";
import { useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";


export default function Dashboard() {
  const { rooms, addRoom, deleteRoom } = useChatStore();
  const { isDark } = useDarkModeStore(); // 💡 pull global dark mode
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();
const { logout } = useAuthStore();
  



  const handleCreate = e => {
    e.preventDefault();
    if (!newTitle.trim()) return toast.error("Title is required");
    addRoom(newTitle.trim());
    toast.success(`Chatroom “${newTitle}” created`);
    setNewTitle("");
  };

  const handleDelete = id => {
    const room = rooms.find(r => r.id === id);
    deleteRoom(id);
    toast.success(`Deleted “${room?.title}”`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
      <Toaster />
      <header className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Your Chatrooms</h1>
  <div className="flex gap-2">
    <DarkModeToggle />
    <button
      onClick={() => {
        logout();
        navigate("/auth");
      }}
      className="px-3 py-1 text-sm border rounded text-red-600 border-red-600 hover:bg-red-100 dark:hover:bg-red-900"
    >
      Logout
    </button>
  </div>
</header>
       

       
      {/* Create new chatroom */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New chatroom title"
          className="flex-grow border rounded px-3 py-2 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      {/* Chatroom list */}
      {rooms.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No chatrooms yet. Create one!
        </p>
      ) : (
        <ul className="space-y-2">
          {rooms.map(r => (
            <li
              key={r.id}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              onClick={() => navigate(`/chat/${r.id}`)}
            >
              <span>{r.title}</span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(r.id);
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
