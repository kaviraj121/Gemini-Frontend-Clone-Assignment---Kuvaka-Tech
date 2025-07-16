import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../../hooks/useAuthStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  otp: z.string().regex(/^\d{6}$/, "6‑digit OTP"),
});

export default function OtpStep() {
  const { verifyOtp, phone } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const [counter, setCounter] = useState(30); // 30‑second resend timer

  useEffect(() => {
    const id = setInterval(() => setCounter(c => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const navigate = useNavigate();

  const onSubmit = ({ otp }) => {
  toast.loading("Verifying…");
  setTimeout(() => {
    toast.dismiss();
    verifyOtp();                              // sets stage = "done"
    toast.success("Logged in!");
    navigate("/dashboard", { replace: true }); // 🚀 hard redirect
  }, 1200);
};

  const resend = () => {
    toast.success("OTP re‑sent");
    setCounter(30);
    reset(); // clear old OTP
  };

  return (
    <div className="space-y-4 max-w-xs mx-auto">
      <p className="text-sm text-gray-600">
        Enter the 6‑digit code sent to{" "}
        <span className="font-medium">{phone?.country + " " + phone?.phone}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
  type="text"
  maxLength="6"
  placeholder="------"
  className="text-center w-full border p-2 rounded tracking-widest text-xl text-black bg-white" // ✅ added
  {...register("otp")}
/>

        {errors.otp && (
          <p className="text-red-500 text-sm">{errors.otp.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </form>

      <button
        onClick={resend}
        disabled={counter > 0}
        className={`w-full py-2 rounded ${
          counter > 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        {counter > 0 ? `Resend OTP in ${counter}s` : "Resend OTP"}
      </button>
    </div>
  );
}
