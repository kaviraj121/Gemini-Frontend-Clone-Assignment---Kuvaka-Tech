# ⚡ Gemini Frontend Clone

A modern, mobile-responsive Gemini chat clone built with React, Zustand, Tailwind CSS, and React Hook Form + Zod.

🔗 **Live Demo**: [View on Netlify/Vercel](https://your-live-link.com)

---

## 🚀 Features

- 🔐 OTP-based login with phone and country code (simulated)
- 💬 Chatroom creation, deletion, and real-time interaction
- 🤖 AI-like message replies with throttled delay (`setTimeout`)
- ⏬ Reverse infinite scroll and pagination (simulated)
- 🌙 Dark mode toggle (global + persisted)
- 📱 Fully responsive for mobile and desktop
- 📤 Image upload support
- 📋 Copy-to-clipboard on hover
- 🔁 Toast notifications and loading states

---

## 🧩 Folder Structure

```
src/
├─ api/                     # API fetch for countries
│  └─ countries.js
│
├─ components/             # UI and logic components
│  ├─ Auth/                # Phone & OTP steps
│  ├─ Chat/                # ChatInput, MessageBubble, TypingIndicator
│  └─ UI/                  # DarkModeToggle, ConfirmDialog, Skeletons
│
├─ hooks/                  # Zustand stores
│  ├─ useAuthStore.js      # Auth logic and persistence
│  ├─ useChatStore.js      # Chatroom and messages
│  └─ useDarkModeStore.js  # Global dark mode toggle
│
├─ pages/                  # Page routes
│  ├─ Auth.jsx
│  ├─ Dashboard.jsx
│  └─ ChatRoom.jsx
│
└─ App.js                  # Main router and layout
```

---

## 🛠️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/gemini-clone.git
cd gemini-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the app**

```bash
npm start
```

> Make sure you're using Node v16+ and have internet access for country API.

---

## 🧠 Feature Implementations

### ✅ Throttling AI Responses

```js
setTimeout(() => {
  // Simulates Gemini typing
  setMessages([...messages, aiResponse]);
}, 1000 + Math.random() * 1000); // random delay
```

Used in `ChatRoom.jsx` after each user message.

---

### ✅ Form Validation

Used **React Hook Form** with **Zod schema** for:
- Country & phone number validation
- OTP format (6-digit check)

```js
const schema = z.object({
  phone: z.string().regex(/^\d{6,14}$/),
  otp: z.string().regex(/^\d{6}$/),
});
```

---

### ✅ Reverse Infinite Scroll (Simulated)

- Messages rendered with `flex-col-reverse` (optional)
- Placeholder logic can simulate loading old messages on scroll
- Ideal place to implement: `onScroll` handler + `slice` pagination

---

### ✅ Client-side Pagination

- Loads 20 messages per page
- Can use `.slice()` based on scroll index
- Setup dummy messages in `useChatStore` or state with `page` logic

---

## 🌓 Dark Mode

- Implemented using Tailwind's `darkMode: 'class'`
- Zustand persists user preference
- Toggle available globally from header on all pages

---

## ✅ Tech Stack

- React (CRA)
- Tailwind CSS
- Zustand (global state)
- React Router
- React Hook Form + Zod
- React Hot Toast

---

## ✨ Author

Made with ❤️ by [Kavi Raj](https://github.com/kavi)

---

## 📄 License

[MIT](LICENSE)