import {OldWorld} from "./World";
import Location from "./Location";
import Person from "./Person";

/**
 * @deprecated */
export default class Canvas {

  /** @type {World} */
  world;

  /** @type {HTMLDivElement} */
  personHolder;

  /** @type {HTMLDivElement} */
  locationHolder;

  /** @type {HTMLDivElement} */
  dateHolder;

  constructor(world) {
    // register container world
    this.world = world;

    // define mappings for holder setup
    const map = [
      { holder: 'personHolder', id: 'people' },
      { holder: 'locationHolder', id: 'locations' },
      { holder: 'dateHolder', id: 'date' },
    ]

    // create holder elements
    map.forEach(({ holder, id }) => {
      if (!Object.hasOwn(this, holder)) {
        console.warn(`Missing container for ${holder}.`)
        return;
      }
      this[holder] = document.createElement('div');
      this[holder].setAttribute('id', id);
      document.body.appendChild(this[holder]);
    });
  }

  /**
   * Adds a new display for a person.
   * @param {Person} person
   */
  drawNewPerson(person) {}

  /**
   * Updates the display for a person, given their current data
   * @param {Person} person
   */
  updatePerson(person) {}

  /**
   * Removes a person from the display.
   * @param {Person} person
   */
  removePerson(person) {}

  /**
   * Adds a new display for a location.
   * @param {Location} location
   */
  drawNewLocation(location) {}

  /**
   * Updates the display for a location, given its current data
   * @param {Location} location
   */
  updateLocation(location) {}

  /**
   * Removes a location from the display.
   * @param {Location} location
   */
  removeLocation(location) {}

  /**
   * Shows the display for the System date.
   * @param {Location} date
   */
  showDate(date) {}

  /**
   * Updates the display for the System date
   * @param {{year: number, month: number, day: number}} date
   */
  updateDate(date) {
    if (this.dateHolder) {
      this.dateHolder.innerHTML = `
        <ul class="date-display">
          <li class="year date-display-metric"><span class="label">Year:</span> <span class="date-value">${date.year + 2013}</span></li>
          <li class="month date-display-metric"><span class="label">Month:</span> <span class="date-value">${months[date.month]}</span></li>
          <li class="day date-display-metric"><span class="label">Day:</span> <span class="date-value">${date.day + 1}</span></li>
        </ul>
      `
    }
  }

  /**
   * Hides the display for the System date.
   * @param {Location} date
   */
  hideDate(date) {}
}
