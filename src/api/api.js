import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export async function fetchTransactions(params = {}) {
  if (!BASE) return fetchTransactionsMock(params);
  const res = await api.get("/transactions", { params });
  return res.data;
}

export async function fetchTransactionsBySchool(schoolId, params = {}) {
  if (!BASE) return fetchTransactionsBySchoolMock(schoolId, params);
  const res = await api.get(`/transactions/school/${schoolId}`, { params });
  return res.data;
}

export async function checkTransactionStatus(customOrderId) {
  if (!BASE) return checkTransactionStatusMock(customOrderId);
  const res = await api.get(`/transaction-status/${customOrderId}`);
  return res.data;
}

const MOCK_TRANSACTIONS = Array.from({ length: 42 }).map((_, i) => {
  const id = `COLLECT_${1000 + i}`;
  const schools = [
    "65b0e6293e9f76a9694d84b4",
    "65b0e6293e9f76a9694d84b5",
    "65b0e6293e9f76a9694d84b6",
  ];
  const statuses = ["success", "pending", "failed"];
  const gateway = ["PhonePe", "Razorpay", "CashFree"][i % 3];
  const school_id = schools[i % schools.length];
  const amount = 1000 + (i % 10) * 50;
  return {
    collect_id: id,
    custom_order_id: `ORD-${2000 + i}`,
    school_id,
    gateway,
    order_amount: amount,
    transaction_amount: amount + (i % 2 ? 0 : 50),
    status: statuses[i % statuses.length],
    payment_time: new Date(Date.now() - i * 3600 * 1000).toISOString(),
  };
});

async function fetchTransactionsMock({
  limit = 10,
  page = 1,
  status,
  school_id,
  sort,
  order,
}) {
  let rows = [...MOCK_TRANSACTIONS];
  if (status)
    rows = rows.filter((r) =>
      Array.isArray(status) ? status.includes(r.status) : r.status === status
    );
  if (school_id) rows = rows.filter((r) => r.school_id === school_id);
  if (sort) {
    rows.sort((a, b) => {
      const aVal = a[sort] ?? "";
      const bVal = b[sort] ?? "";
      if (aVal < bVal) return order === "desc" ? 1 : -1;
      if (aVal > bVal) return order === "desc" ? -1 : 1;
      return 0;
    });
  }
  const total = rows.length;
  const start = (page - 1) * limit;
  const data = rows.slice(start, start + Number(limit));
  return { data, total, page: Number(page), limit: Number(limit) };
}

async function fetchTransactionsBySchoolMock(schoolId, opts = {}) {
  return fetchTransactionsMock({ ...opts, school_id: schoolId });
}

async function checkTransactionStatusMock(customOrderId) {
  const found = MOCK_TRANSACTIONS.find(
    (t) => t.custom_order_id === customOrderId || t.collect_id === customOrderId
  );
  if (!found) return { status: "NOT_FOUND", data: null };
  return { status: found.status.toUpperCase(), data: found };
}
