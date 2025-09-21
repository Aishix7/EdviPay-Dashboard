import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { fetchTransactions } from "../api/api";
import { parseIntOrDefault } from "../utils/query";

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(
    parseIntOrDefault(searchParams.get("limit"), 10)
  );
  const [page, setPage] = useState(
    parseIntOrDefault(searchParams.get("page"), 1)
  );
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [schoolId, setSchoolId] = useState(searchParams.get("school_id") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "payment_time");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  useEffect(() => {
    load();
  }, [page, limit, status, schoolId, sort, order]);

  async function load() {
    setLoading(true);
    try {
      const params = { limit, page, sort, order };
      if (status) params.status = status;
      if (schoolId) params.school_id = schoolId;
      const res = await fetchTransactions(params);
      setData(res.data || res);
      setTotal(res.total ?? (res.data ? res.data.length : 0));
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoading(false);
      updateURL();
    }
  }

  function updateURL() {
    const sp = {};
    if (limit) sp.limit = limit;
    if (page) sp.page = page;
    if (status) sp.status = status;
    if (schoolId) sp.school_id = schoolId;
    if (sort) sp.sort = sort;
    if (order) sp.order = order;
    setSearchParams(sp);
  }

  function onApply() {
    setPage(1);
    load();
  }

  function onClear() {
    setStatus("");
    setSchoolId("");
    setPage(1);
    setSort("payment_time");
    setOrder("desc");
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
      <h2 className="text-xl font-semibold mb-4">Transactions Overview</h2>

      <Filters
        status={status}
        onStatusChange={setStatus}
        schoolId={schoolId}
        onSchoolChange={setSchoolId}
        onApply={onApply}
        onClear={onClear}
      />

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
