import React, { useEffect, useState } from "react";
import { fetchTransactionsBySchool } from "../api/api";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";

export default function SchoolTransactions() {
  const [schoolId, setSchoolId] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("payment_time");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    if (schoolId) load();
  }, [page, sort, order]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchTransactionsBySchool(schoolId, {
        limit,
        page,
        sort,
        order,
      });
      setData(res.data || res);
      setTotal(res.total ?? (res.data ? res.data.length : 0));
    } catch (err) {
      console.error("Error loading school transactions:", err);
    } finally {
      setLoading(false);
    }
  }

  function onSearch() {
    setPage(1);
    load();
  }

  function onSort(field) {
    if (sort === field) setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    else {
      setSort(field);
      setOrder("asc");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions by School</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          placeholder="Enter school_id (e.g. 65b0e6...)"
          className="border px-3 py-2 rounded flex-1"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {[10, 20, 50].map((l) => (
            <option key={l} value={l}>
              Rows per page: {l}
            </option>
          ))}
        </select>
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded shadow-sm text-center">
          Loading...
        </div>
      ) : (
        <>
          <TransactionTable
            data={data}
            sort={sort}
            order={order}
            onSort={onSort}
          />
          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
