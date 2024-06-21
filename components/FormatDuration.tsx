export function formatDuration(duration: string, page?: string) {
  const match = duration.match(/PT(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  let totalMinutes = parseInt(match[1] ? match[1].slice(0, -1) : '0');
  const seconds = match[2] ? match[2].slice(0, -1).padStart(2, '0') : '00';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (page === 'amusement') {
    if (hours > 0) {
      return `${hours}시 ${minutes}분`;
    } else {
      return `${minutes}분`;
    }
  } else {
    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }
}
