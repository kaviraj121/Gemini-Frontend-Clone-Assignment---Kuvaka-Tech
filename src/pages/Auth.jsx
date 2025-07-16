import { useAuthStore } from "../hooks/useAuthStore";
import PhoneStep from "../components/Auth/PhoneStep";
import OtpStep from "../components/Auth/OtpStep";
import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import DarkModeToggle from "../components/UI/DarkModeToggle";

export default function AuthPage() {
  const { stage } = useAuthStore();

  if (stage === "done") return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors px-4">
      <Toaster position="top-center" />

      {/* Dark Mode Toggle at the top-right */}
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      {/* Auth steps */}
      {stage === "phone" && <PhoneStep />}
      {stage === "otp" && <OtpStep />}
      {stage === "done" && (
        <h2 className="text-2xl font-bold">✅ Logged in! (navigate to dashboard)</h2>
      )}
    </div>
  );
}
