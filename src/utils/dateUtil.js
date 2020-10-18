export function timeFormat(hour) {
  const start = parseInt(hour);
  const end = (start + 1) % 25
  return `${start}:00 - ${end}:00`
}
