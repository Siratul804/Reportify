"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/ai-des", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult({ error: "Failed to analyze image" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Upload an Image
        </h2>
        <label className="block w-full border border-gray-300 p-3 rounded-lg cursor-pointer text-gray-500 text-center bg-gray-50 hover:bg-gray-100">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          {file ? file.name : "Choose an image"}
        </label>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-sm text-gray-700">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          <pre className="text-sm mt-2 p-2 bg-gray-100 rounded-lg overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
