export function timeFormat(hour) {
  const start = hour;
  const end = (hour + 1) % 25
  return `${start}:00 - ${end}:00`
}
