import System from "./System";
import World from "../World";
import {
  DateChangeEvent,
  DayIncrementEvent,
  WeekIncrementEvent,
  MonthIncrementEvent,
  YearIncrementEvent,
  type DateRepresentation
} from "./dateEvents";

export default class DateSystem extends System {
  /** @type {number} The day of the month */
  #day = 0;

  /** @type {number} The day of the week */
  #weekday = 0;

  /** @type {number} The week of the year */
  #week = 0;

  /** @type {number} The month of the year */
  #month = 0;

  /** @type {number} The full year */
  #year = 0;

  /** @type {number} The rate at which time passes */
  #interval = 0;

  /** @type {number|null} */
  #timerIndex: number|null = null;

  // /** @type {boolean} */
  // #isRunning = false;

  /**
   * @constructor
   * @param {number} interval
   * @param {World} world
   */
  constructor(interval: number, world: World) {
    super(world);
    this.#interval = interval;
  }

  /**
   * Returns a custom date object representing the current system's date.
   * @returns {{year: number, month: number, day: number}}
   */
  getDate(): DateRepresentation {
    return {
      year: this.#year,
      month: this.#month,
      week: this.#week,
      day: this.#day,
    };
  }

  changeSpeed(interval: number) {
    this.#interval = interval;

    // if timer is currently running, restart with new speed
    if (this.isRunning()) {
      this.stopTime();
      this.startTime();
    }
  }

  /**
   * Begins the progression of time according to the set interval.
   */
  startTime(delay:number|null = null) {
    delay = delay || this.#interval || 10_000;
    this.#timerIndex = setInterval(() => this.#incrementDay(), delay);
    // this.#isRunning = true;
  }

  /**
   * Stops the progression of time.
   */
  stopTime() {
    if (!this.#timerIndex) return;
    clearInterval(this.#timerIndex);
    this.#timerIndex = null;
    // this.#isRunning = false;
  }

  /**
   * Returns whether the date timer is currently running or not.
   */
  isRunning(): boolean {
    return this.#timerIndex !== null;
    // return this.#isRunning;
  }

  /**
   * Move the date system forward by one day.
   */
  #incrementDay(): void {
    this.#day++;
    this.#weekday++;

    // emit event of date change (atomic change)
    document.dispatchEvent(new DayIncrementEvent(this.getDate()));

    // emit event of date change for days
    document.dispatchEvent(new DateChangeEvent(this.getDate()));

    // trigger new week and reset weekday counter
    if (this.#weekday >= 7) {
      this.#weekday = 0;
      this.#incrementWeek();
    }

    // trigger new month and reset day counter
    if (this.#day >= (30 - 1)) {
      this.#day = 0;
      this.#incrementMonth();
    }
  }

  /**
   * Move the date system forward by one month.
   */
  #incrementWeek(): void {
    this.#week++;

    // emit event of date change for months
    document.dispatchEvent(new WeekIncrementEvent(this.getDate()));
  }

  /**
   * Move the date system forward by one month.
   */
  #incrementMonth(): void {
    this.#month++;

    // emit event of date change for months
    document.dispatchEvent(new MonthIncrementEvent(this.getDate()));

    // trigger new year and reset month counter
    if (this.#month >= 12) {
      this.#month = 0;
      this.#incrementYear();
    }
  }

  /**
   * Move the date system forward by one day.
   */
  #incrementYear(): void {
    this.#year++;

    // reset week counter for new year
    this.#week = 0;

    // emit event of date change for years
    document.dispatchEvent(new YearIncrementEvent(this.getDate()));
  }
}