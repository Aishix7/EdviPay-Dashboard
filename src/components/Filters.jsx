import React from "react";

export default function Filters({
  status,
  onStatusChange,
  schoolId,
  onSchoolChange,
  onApply,
  onClear,
}) {
  return (
    <div className="bg-white p-4 rounded-md shadow mb-4 flex flex-col md:flex-row md:items-end md:space-x-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Status</label>
        <select
          value={status || ""}
          onChange={(e) => onStatusChange(e.target.value || null)}
          className="mt-1 px-3 py-2 border rounded"
        >
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="flex flex-col mt-3 md:mt-0">
        <label className="text-sm text-gray-600">School ID</label>
        <input
          value={schoolId || ""}
          onChange={(e) => onSchoolChange(e.target.value || null)}
          placeholder="Paste school_id"
          className="mt-1 px-3 py-2 border rounded"
        />
      </div>

      <div className="flex items-center space-x-2 mt-3 md:mt-0">
        <button
          onClick={onApply}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Apply
        </button>
        <button onClick={onClear} className="px-3 py-2 border rounded text-sm">
          Clear
        </button>
      </div>
    </div>
  );
}
