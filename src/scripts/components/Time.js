import {OldWorld} from "./World";
import Canvas from "./Canvas";
import { months } from "../support/constants";

/**
 * @deprecated */
export default class Time {
  interval;
  timer;
  day = 0;
  week = 0;
  month = 0;
  year = 0;
  events = [];
  display;

  /** @var {System} system */
  system;

  /**
   *
   * @param {number} interval
   * @param {System} system
   */
  constructor(interval, system) {
    this.interval = interval;
    this.system = system;
    this.display = document.querySelector('#time');

    console.log('system', system)

    this.month = 0;
    this.displayTime();

    this.startTimer(1000);
  }

  /**
   * Returns a reference to the containing system
   * @returns {System}
   */
  getSystem() {
    return this.system;
  }

  getDate() {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    }
  }

  incrementDay() {
    this.day++;

    if (this.day >= 30) {
      this.day = 0;
      this.incrementMonth();
    }

    // trigger event handler actions for month increase
    document.dispatchEvent(new CustomEvent('dayIncrement', {
      detail: {
        message: "A day has passed",
        date: this.getDate(),
      }
    }));

    this.displayTime();
  }

  incrementMonth() {
    this.month++;

    // increment Year
    if (this.month >= 12) {
      this.month = 0;
      this.incrementYear();
    }

    this.system.getWorld().getPersons().forEach(person => {
      // advance progess of pregnancies
      if (person.isPregnant()) {
        person.pregnancy.advance();
      }
    });

    // trigger event handler actions for month increase
    document.dispatchEvent(new CustomEvent('monthIncrement', {
      detail: {
        message: "A month has passed",
        date: this.getDate(),
      }
    }));
  }

  incrementYear() {
    this.year++;

    // trigger event handler actions for month increase
    document.dispatchEvent(new CustomEvent('yearIncrement', {
      detail: {
        message: "A year has passed",
        date: this.getDate(),
      }
    }));
  }

  decrementMonth() {
    this.month--;

    // increment Year
    if (this.month < 0) {
      this.year--;
      this.month = 11;
    }
  }

  startTimer(delay) {
    delay = delay || interval || 10_000;
    this.timer = setInterval(() => this.incrementDay(), delay);
    return this;
  }

  stopTimer() {
    clearInterval(this.timer);
    return this;
  }

  getTimer() {
    return this.timer;
  }

	getMonth(){ return month; }
	getMonthName(){ return months[month]; }
	getYear(){ return year; }
  getDate() { return new Date(this.year + 2013, this.month, this.day); }
  displayTime() {
    /** @type {World} */
    const world = this.system.getWorld(),
      canvas = world.getCanvas();

    canvas.updateDate(this.getDate());
  }
}