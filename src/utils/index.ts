export function formatDate(fullDate: Date, separator: string = "/") {
  return fullDate.toLocaleDateString("en-CA").split("-").reverse().join(separator);
}

export function formatDateForMSSQL(fullDate: Date) {
  return fullDate.toLocaleDateString("en-CA").replaceAll("-", "");
}
