export function toPersianDateFormat(date: string, sep?: string) {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('fa-IR');
}
export function toPersianDateTimeFormat(date: string, sep?: string) {
  const dateObj = new Date(date);

  return dateObj.toLocaleString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
