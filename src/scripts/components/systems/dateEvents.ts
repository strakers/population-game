
export type DateRepresentation = { year: number, month: number, week: number, day: number };

class DateEvent extends Event {
  #data: DateRepresentation|null = null;

  setData(data: DateRepresentation) {
    this.#data = data;
  }

  getData(): DateRepresentation {
    return this.#data || { year: 0, month: 0, week: 0, day: 0 };
  }
}

/**
 * @event #dateChange
 */
export class DateChangeEvent extends DateEvent {
  constructor(data: DateRepresentation) {
    super('dateChange');
    this.setData(data);
  }
}

export class DayIncrementEvent extends DateEvent {
  constructor(data: DateRepresentation) {
    super('dayIncrement');
    this.setData(data);
  }
}

export class WeekIncrementEvent extends DateEvent {
  constructor(data: DateRepresentation) {
    super('weekIncrement');
    this.setData(data);
  }
}

export class MonthIncrementEvent extends DateEvent {
  constructor(data: DateRepresentation) {
    super('monthIncrement');
    this.setData(data);
  }
}

export class YearIncrementEvent extends DateEvent {
  constructor(data: DateRepresentation) {
    super('yearIncrement');
    this.setData(data);
  }
}

export default {
  DateChangeEvent,
  DayIncrementEvent,
  WeekIncrementEvent,
  MonthIncrementEvent,
  YearIncrementEvent,
}