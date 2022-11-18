export default function getDateFormat(date, separator) {
  const currentDate = new Date(date);
  function dateLength(date) {
    return date < 10 ? "0" + date : date;
  }
  return `${dateLength(currentDate.getDate())}${separator}${dateLength(
    currentDate.getMonth() + 1
  )}${separator}${currentDate.getFullYear()}`;
}

export function createSetArray(arr) {
  return Array.from(new Set(arr));
}

export const today = Date.now();
