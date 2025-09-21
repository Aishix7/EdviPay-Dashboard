import React, { useState } from "react";
import { checkTransactionStatus } from "../api/api";

export default function CheckStatus() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onCheck(e) {
    e.preventDefault();
    setResult(null);
    setError("");
    if (!orderId) {
      setError("Please enter custom_order_id or collect_id");
      return;
    }

    setLoading(true);
    try {
      const res = await checkTransactionStatus(orderId);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch status");
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setOrderId("");
    setResult(null);
    setError("");
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Check Transaction Status
      </h2>

      <form
        onSubmit={onCheck}
        className="bg-white p-5 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="text-gray-700 font-medium">
            Custom Order ID or Collect ID
          </label>
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ORD-2001 or COLLECT_1001"
            className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Check
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {loading && (
          <div className="text-center text-gray-500 font-medium">
            Loading...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-gray-50 p-5 rounded-lg shadow-md border border-gray-200 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Status:</span>
              <span
                className={`px-2 py-1 rounded font-medium text-sm ${
                  result.status === "SUCCESS"
                    ? "bg-green-100 text-green-800"
                    : result.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.status}
              </span>
            </div>

            <div className="bg-white p-3 rounded border border-gray-200 overflow-x-auto text-sm font-mono">
              {Object.keys(result.data || result).map((key) => (
                <div
                  key={key}
                  className="flex justify-between border-b last:border-b-0 py-1"
                >
                  <span className="font-medium text-gray-600">{key}</span>
                  <span className="text-gray-800">
                    {result.data ? result.data[key] : result[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
