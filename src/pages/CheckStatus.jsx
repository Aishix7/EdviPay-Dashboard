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
    <div>
      <h2 className="text-xl font-semibold mb-4">Check Transaction Status</h2>

      <form
        onSubmit={onCheck}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <div>
          <label className="text-sm text-gray-600">
            Custom Order ID or Collect ID
          </label>
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ORD-2001 or COLLECT_1001"
            className="mt-1 w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Check
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-3 py-2 border rounded"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-4">
        {loading && (
          <div className="bg-white p-4 rounded shadow text-center">
            Loading...
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
        )}
        {result && (
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">
              Status:{" "}
              <span className="text-indigo-600 ml-2">{result.status}</span>
            </h4>
            <pre className="mt-3 text-sm overflow-auto bg-gray-50 p-3 rounded">
              {JSON.stringify(result.data || result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
