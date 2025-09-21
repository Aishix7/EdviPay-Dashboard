export function parseIntOrDefault(val, def = 1) {
  const n = parseInt(val);
  return Number.isNaN(n) ? def : n;
}
