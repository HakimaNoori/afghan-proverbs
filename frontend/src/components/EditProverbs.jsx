import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";


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
  const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBaseUrl();

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/proverbs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت ضرب‌المثل");
        return res.json();
      })
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت داده", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/proverbs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("خطا در ویرایش ضرب‌المثل");
    }
  };

  if (loading) return <p>در حال بارگذاری اطلاعات ضرب‌المثل...</p>;

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
