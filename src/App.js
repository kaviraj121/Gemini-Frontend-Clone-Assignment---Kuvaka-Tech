import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./hooks/useAuthStore";
import ChatRoom from "./pages/ChatRoom";

export default function App() {
  const { stage } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={stage === "done" ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route
  path="/"
  element={<Navigate to={stage === "done" ? "/dashboard" : "/auth"} replace />}
/>
    <Route path="/chat/:id" element={<ChatRoom />} />

      </Routes>
    </BrowserRouter>
  );
}
