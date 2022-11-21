export default function getDateFormat(date, separator) {
  const currentDate = new Date(date);
  function dateLength(date) {
    return date < 10 ? "0" + date : date;
  }
  return `${dateLength(currentDate.getDate())}${separator}${dateLength(
    currentDate.getMonth() + 1
  )}${separator}${currentDate.getFullYear()}`;
}

export const today = Date.now();
