import { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="w-full bg-[#0A1F44] text-white py-2 rounded">
        Register
      </button>
    </form>
  );
}
