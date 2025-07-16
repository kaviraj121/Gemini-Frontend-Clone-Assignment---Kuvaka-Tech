import { useParams, useNavigate } from "react-router-dom";
import { useChatStore } from "../hooks/useChatStore";
import ChatInput from "../components/Chat/ChatInput";
import MessageBubble from "../components/Chat/MessageBubble";
import TypingIndicator from "../components/Chat/TypingIndicator";
import DarkModeToggle from "../components/UI/DarkModeToggle";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useDarkModeStore } from "../hooks/useDarkModeStore";
import MessageSkeleton from "../components/Chat/MessageSkeleton";
import { useAuthStore } from "../hooks/useAuthStore";

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms } = useChatStore();
  const room = rooms.find(r => r.id === id);
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuthStore();

  // Redirect if room not found
  useEffect(() => {
    if (!room) navigate("/dashboard");
  }, [room, navigate]);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = ({ text, image }) => {
    const userMsg = {
      id: nanoid(),
      role: "user",
      content: text,
      image,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    simulateGeminiReply(text);
  };

  const simulateGeminiReply = (userText) => {
    setLoading(true);
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: nanoid(),
          role: "ai",
          content: `I see you said: "${userText}" 🤖`,
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
      <header className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800 sticky top-0 z-10">
  <h2 className="text-lg font-bold">{room?.title}</h2>
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

      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map(msg => (
          <MessageBubble key={msg.id} {...msg} />
        ))}

        {loading && <div className="flex items-center gap-2">
    <MessageSkeleton />
    <TypingIndicator />
  </div>}
        <div ref={bottomRef} />
      </main>

      <footer className="p-4 bg-white dark:bg-gray-800 shadow">
        <ChatInput onSend={handleSend} />
      </footer>
    </div>
  );
}
