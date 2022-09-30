import moment, { Moment } from "moment";

export const isCurrentDay = (day: string) => moment().isSame(day, "day");
export const isSelectedMonth = (day: string, today: Moment) =>
  today.isSame(day, "month");
export const isDayContainCurrentEvent = (event: Moment, dayItem: any) =>
  event.date >= dayItem.startOf("day").format("X") &&
  event.date <= dayItem.clone().endOf("day").format("X");

export const DISPLAY_MODE_MONTH = "month";
export const DISPLAY_MODE_DAY = "day";

export const ITEMS_PER_DAY = 24;
