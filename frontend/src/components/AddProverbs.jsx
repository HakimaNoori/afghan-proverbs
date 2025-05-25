import React, { useState } from "react";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

const AddProverb = ({ onAdd }) => {
  const [form, setForm] = useState({
    textDari: "",
    textPashto: "",
    translationEn: "",
    meaning: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const apiBaseUrl = getApiBaseUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiBaseUrl}/api/proverbs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({
        textDari: "",
        textPashto: "",
        translationEn: "",
        meaning: "",
        category: "",
      });
      onAdd(); // reload list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-bold mb-2">➕ Add New Proverb</h2>
      {["textDari", "textPashto", "translationEn", "meaning", "category"].map(
        (field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            required
            className="block w-full border mb-2 p-2"
          />
        )
      )}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default AddProverb;
