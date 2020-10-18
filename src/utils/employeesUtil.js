export default function blocksAssigned(schedule) {
  let ocurrences = {};

  for (const dayIndex in schedule) {
    for (const hour in schedule[dayIndex]) {
      let employee = schedule[dayIndex][hour];
      ocurrences[employee] = ocurrences[employee] ? ocurrences[employee] + 1 : 1
    }
  }

  return ocurrences;
}
