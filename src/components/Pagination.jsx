import React from "react";

export default function Pagination({ page, limit, total, onPageChange }) {
  const totalPages = Math.ceil(total / limit) || 1;
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Page {page} of {totalPages} — {total} total
      </div>
      <div className="flex items-center space-x-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
