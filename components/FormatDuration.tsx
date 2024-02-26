export function FormatDuration(duration: string) {
  const match = duration.match(/PT(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  const minutes = match[1] ? match[1].slice(0, -1) : '0';
  const seconds = match[2] ? match[2].slice(0, -1) : '0';
  return `${minutes}:${seconds.padStart(2, '0')}`;
}
