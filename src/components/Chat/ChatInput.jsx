import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (!text && !image) return;
    onSend({ text, image });
    setText("");
    setImage(null);
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
  value={text}
  onChange={e => setText(e.target.value)}
  placeholder="Type your message..."
  className="flex-1 border rounded px-3 py-2 text-black bg-white"
  // 👆 ensures black text on white bg in both light & dark mode
/>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
