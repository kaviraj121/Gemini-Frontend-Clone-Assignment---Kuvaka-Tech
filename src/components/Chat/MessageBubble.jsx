import { useState } from "react";
import toast from "react-hot-toast";

export default function MessageBubble({ role, content, image, timestamp }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isUser = role === "user";

  return (
    <div
      onClick={copyToClipboard}
      className={`max-w-xs px-3 py-2 rounded-lg text-sm cursor-pointer relative ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-gray-200 text-black"
      }`}
    >
      {image && (
        <img src={image} alt="uploaded" className="mb-1 rounded max-w-full" />
      )}
      <p>{content}</p>
      <span className="block mt-1 text-xs text-right opacity-60">
        {new Date(timestamp).toLocaleTimeString()}
      </span>
      {copied && (
        <span className="absolute top-0 right-0 text-[10px] px-1 bg-white text-black rounded">
          Copied
        </span>
      )}
    </div>
  );
}
