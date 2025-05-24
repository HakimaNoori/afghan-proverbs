import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProverbDetail = () => {
  const { id } = useParams();
  const [proverb, setProverb] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/proverbs/${id}`)
      .then((res) => res.json())
      .then((data) => setProverb(data))
      .catch((err) => console.error("Error loading data", err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this proverb?")) {
      const res = await fetch(`/api/proverbs/${id}`, { method: "DELETE" });
      if (res.ok) navigate("/");
    }
  };

  if (!proverb) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">📖 Proverb Details</h2>
      <p>
        <strong>Dari:</strong> {proverb.textDari}
      </p>
      <p>
        <strong>Pashto:</strong> {proverb.textPashto}
      </p>
      <p>
        <strong>English:</strong> {proverb.translationEn}
      </p>
      <p>
        <strong>Meaning:</strong> {proverb.meaning}
      </p>
      <p>
        <strong>Category:</strong> {proverb.category}
      </p>

      <div className="mt-4 space-x-2">
        <Link
          to={`/edit/${proverb._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProverbDetail;
