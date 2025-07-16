import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCountries } from "../../api/countries";
import { useAuthStore } from "../../hooks/useAuthStore";
import toast from "react-hot-toast";

const schema = z.object({
  country: z.string().min(1, "Pick a country"),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, "Enter 6‑14 digits"),
});

export default function PhoneStep() {
  const { setPhone } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then(setCountries).catch(() =>
      toast.error("Failed to load countries")
    );
  }, []);

  const onSubmit = ({ country, phone }) => {
    toast.success("OTP sent!");
    setPhone({ country, phone });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xs mx-auto"
    >
      <select
  className="w-full border p-2 rounded text-black bg-white" // ✅ added
  {...register("country")}
  defaultValue=""
>
  <option value="" disabled>
    Country / Dial code
  </option>
  {countries.map(c => (
    <option key={c.iso2} value={c.dial}>
      {c.name} ({c.dial})
    </option>
  ))}
</select>

      {errors.country && (
        <p className="text-red-500 text-sm">{errors.country.message}</p>
      )}

      <input
  type="tel"
  placeholder="Phone number"
  className="w-full border p-2 rounded text-black bg-white" // ✅ added
  {...register("phone")}
/>

      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Send OTP
      </button>
    </form>
  );
}
