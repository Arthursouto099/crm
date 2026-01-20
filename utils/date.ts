export function formatDayUTC(value: Date | string, withYear = false) {
  const d = value instanceof Date ? value : new Date(value);
  return d.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}