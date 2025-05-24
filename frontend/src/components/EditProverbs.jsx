import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProverb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    textDari: "",
    textPashto: "",
    translationEn: "",
    meaning: "",
    category: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/proverbs/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error("خطا در دریافت داده", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/proverbs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/"); // بعد از ویرایش به صفحه اصلی برگرد
    } else {
      alert("خطا در ویرایش ضرب‌المثل");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border shadow rounded">
      <h2 className="text-xl font-bold mb-4">✏️ ویرایش ضرب‌المثل</h2>
      <form onSubmit={handleSubmit}>
        {["textDari", "textPashto", "translationEn", "meaning", "category"].map(
          (field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="block w-full border mb-2 p-2"
              required
            />
          )
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default EditProverb;
