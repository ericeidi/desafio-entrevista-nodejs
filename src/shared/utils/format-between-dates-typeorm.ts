import { Between } from 'typeorm';

export const FormatBetweenDates = (
  date: string,
  startHour: string,
  endHour: string,
) => {
  const start = new Date(`${date}T${startHour}:00:00.00Z`);
  const end = new Date(`${date}T${endHour}:00:00.00Z`);
  const between = Between(
    new Date(start).toISOString(),
    new Date(end).toISOString(),
  );
  return between;
};
