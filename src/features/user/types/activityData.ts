export type ActivityData = { [date: string]: number };

export const countConsecutiveDays = (activityData: ActivityData) => {
  let date = new Date();
  let count = 0;

  while (true) {
    const key = date.toISOString().slice(0, 10);
    if (activityData[key] !== undefined) {
      count++;
      date.setDate(date.getDate() - 1)
    } else {
      break;
    }
  }

  return count;
};
