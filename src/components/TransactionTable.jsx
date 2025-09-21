import React from "react";

function SortableHeader({ label, field, sort, order, onSort }) {
  const isActive = sort === field;
  const dir = isActive ? (order === "desc" ? "↓" : "↑") : "";
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1"
    >
      <span>{label}</span>
      <span className="text-xs text-gray-500">{dir}</span>
    </button>
  );
}

export default function TransactionTable({ data = [], sort, order, onSort }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-600">
            {[
              "Sr.No",
              "School ID",
              "Order ID",
              "Date",
              "Order Amt",
              "Amt Transaction",
              "Payment Method",
              "Status",
              "Student Name",
              "Phone No",
            ].map((label, i) => (
              <th key={i} className="px-4 py-3">
                {i < 8 ? (
                  <SortableHeader
                    label={label}
                    field={label.toLowerCase().replace(/ /g, "_")}
                    sort={sort}
                    order={order}
                    onSort={onSort}
                  />
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          )}
          {data.map((row, index) => (
            <tr
              key={row.collect_id}
              className="border-b hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <td className="px-4 py-3 text-sm">{index + 1}</td>
              <td className="px-4 py-3 text-sm">{row.school_id}</td>
              <td className="px-4 py-3 text-sm">{row.custom_order_id}</td>
              <td className="px-4 py-3 text-sm">
                {new Date(row.payment_time || Date.now()).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-right">
                {row.order_amount}
              </td>
              <td className="px-4 py-3 text-sm text-right">
                {row.transaction_amount}
              </td>
              <td className="px-4 py-3 text-sm">{row.gateway}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    row.status === "success"
                      ? "bg-green-100 text-green-800"
                      : row.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{row.student_name || "N/A"}</td>
              <td className="px-4 py-3 text-sm">{row.phone_no || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
