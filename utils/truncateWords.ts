export function truncateWords(text: string | undefined, wordLimit: number) {
  if (!text) return '';
  const words = text.split(/\s+/);
  return (
    words.slice(0, wordLimit).join(' ') +
    (words.length > wordLimit ? '...' : '')
  );
}
