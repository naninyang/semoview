export function formatDuration(duration: string) {
  const match = duration.match(/PT(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  let totalMinutes = parseInt(match[1] ? match[1].slice(0, -1) : '0');
  const seconds = match[2] ? match[2].slice(0, -1).padStart(2, '0') : '00';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  } else {
    return `${minutes}분 ${seconds}초`;
  }
}
