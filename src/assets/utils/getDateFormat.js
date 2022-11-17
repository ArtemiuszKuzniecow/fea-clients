export default function getDateFormat(date, separator) {
  const currentDate = new Date(date);
  function dateLength(date) {
    return date < 10 ? "0" + date : date;
  }
  return `${dateLength(currentDate.getDate())}${separator}${dateLength(
    currentDate.getMonth() + 1
  )}${separator}${currentDate.getFullYear()}`;
}

export function getOppositeDateFormat(data) {
  const date = new Date(
    `${data.slice(6)}-${data.slice(3, 5)}-${data.slice(0, 2)}`
  );
  return date;
}

export const today = Date.now();
