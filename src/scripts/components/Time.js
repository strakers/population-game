import { months } from "../support/constants";

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

    this.month = 0;
    this.displayTime();

    this.startTimer(1000);
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
        date: {
          day: this.day,
          month: this.month,
          year: this.year,
        }
      }
    }));

    this.displayTime();
  }

  incrementMonth() {
    console.log('increment month', this.month);
    this.month++;

    // increment Year
    if (this.month >= 12) {
      this.month = 0;
      this.incrementYear();
    }

    window.world.getPersons().forEach(person => {
      // advance progess of pregnancies
      if (person.isPregnant()) {
        person.pregnancy.advance();
      }
    });

    // trigger event handler actions for month increase
    document.dispatchEvent(new CustomEvent('monthIncrement', {
      detail: {
        message: "A month has passed",
        date: {
          day: this.day,
          month: this.month,
          year: this.year,
        }
      }
    }));
  }

  incrementYear() {
    this.year++;

    // trigger event handler actions for month increase
    document.dispatchEvent(new CustomEvent('yearIncrement', {
      detail: {
        message: "A year has passed",
        date: {
          day: this.day,
          month: this.month,
          year: this.year,
        }
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
    if (!!this.display) {
      this.display.innerHTML = `
        <ul class="date-display">
          <li class="year date-display-metric"><span class="label">Year:</span> <span class="date-value">${this.year + 2013}</span></li>
          <li class="month date-display-metric"><span class="label">Month:</span> <span class="date-value">${months[this.month]}</span></li>
          <li class="day date-display-metric"><span class="label">Day:</span> <span class="date-value">${this.day + 1}</span></li>
        </ul>
      `;
    }
    else {
      console.warn('There is no element set to display the date');
    }
  }
}