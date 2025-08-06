/**
 * Converts a date string or Date object into a formatted string.
 * 
 * @param date - A Date object or ISO date string.
 * @param format - Format string: e.g. 'yyyy-MM-dd', 'dd/MM/yyyy'.
 * @returns Formatted date string or empty string if invalid.
 */
export function formatDate(date: string | Date, format: string): string {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'dd-MM-yyyy':
      return `${day}-${month}-${year}`;
    default:
      return d.toISOString(); // fallback
  }
}
