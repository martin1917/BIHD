export function formatDate(fullDate: Date, separator: string = "/") {
  const day = fullDate.getDay();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  const dayStr = 0 < day && day < 10 ? `0${day}` : `${day}`;
  const monthStr = 0 < month && month < 10 ? `0${month}` : `${month}`;
  const yearStr = `${year}`;

  return `${dayStr}${separator}${monthStr}${separator}${yearStr}`;
}
