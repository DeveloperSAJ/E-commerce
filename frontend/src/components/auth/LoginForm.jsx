import { useState } from "react";

export default function LoginForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        disabled={loading}
        className="w-full bg-[#0A1F44] text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
