import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const ProverbList = () => {
  const [proverbs, setProverbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch("/api/proverbs")
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        return res.json();
      })
      .then((data) => {
        setProverbs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("آیا مطمئنی که می‌خواهی حذف کنی؟")) {
      const res = await fetch(`/api/proverbs/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    }
  };

  if (loading) return <p>در حال دریافت اطلاعات...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">لیست ضرب‌المثل‌ها</h2>
      {proverbs.map((proverb) => (
        <div key={proverb._id} className="bg-white p-4 mb-2 shadow rounded">
          <p>
            <strong>textDari:</strong> {proverb.textDari}
          </p>
          <p>
            <strong>textPashto:</strong> {proverb.textPashto}
          </p>
          <p>
            <strong>translationEn:</strong> {proverb.translationEn}
          </p>
          <p>
            <strong>meaning:</strong> {proverb.meaning}
          </p>
          <p>
            <strong>category:</strong> {proverb.category}
          </p>
          <div className="mt-2 flex gap-2">
            <Link
              to={`/edit/${proverb._id}`}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              ✏️ ویرایش
            </Link>
            <button
              onClick={() => handleDelete(proverb._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              🗑️ حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProverbList;
