import { zonedTimeToUtc } from 'date-fns-tz';
import { TimezoneUtc } from '../constants/timezone-utc';

export const ConvertUtc = (date: Date) => {
  return zonedTimeToUtc(date, TimezoneUtc).toISOString();
};
