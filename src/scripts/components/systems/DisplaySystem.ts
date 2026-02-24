import { PersonStatusChangeEvent } from "../beings/personEvents";
import { DateChangeEvent, type DateRepresentation } from "./dateEvents";
import Person from "../beings/Person";
import System from "./System";
import World from "../World";
import { months } from "../../support/constants";
import type { Country } from "../places/Location";

export default class DisplaySystem extends System {
  #containers = new Map<string, HTMLDivElement>();

  constructor(world: World) {
    super(world);

    this.#containers.set('people', createContainer('people', ['container']));
    this.#containers.set('locations', createContainer('locations', ['container']));
    this.#containers.set('date', createContainer('date', ['container']));

    // set perpetual listener for time changes.
    document.addEventListener('dateChange', (/** @type {DateChangeEvent} */ e) => {
      if (!(e instanceof DateChangeEvent)) return;
      this.displayDate(e.data);
    })
  }

  /**
   * @type {HTMLDivElement}
   */
  get personContainer() {
    return this.#containers.get('people');
  }

  /**
   * @type {HTMLDivElement}
   */
  get locationContainer() {
    return this.#containers.get('locations');
  }

  /**
   * @type {HTMLDivElement}
   */
  get dateContainer() {
    return this.#containers.get('date');
  }

  /**
   * Displays a person in the appropriate container.
   */
  displayPerson(person: Person) {
    const personDisplay = person.getDisplayElement();
    if (!personDisplay) {
      console.warn(`Person ${person.name} does not have a display element registered.`);
      return;
    }

    this.personContainer?.appendChild(personDisplay);
    personDisplay.addEventListener('personStatusChange', (e) => {
      if (!(e instanceof PersonStatusChangeEvent)) return;
      // Handle person status change events to update the display accordingly.
      const classes = e.person.getDisplayClasses(); // Assuming the event includes details about the status change.
      personDisplay.className = classes.join(' ');
    });
  }

  /**
   * Displays a location in the appropriate container.
   */
  displayLocation(location: Country) {
    const locationDisplay = location.getDisplayElement();
    if (!locationDisplay) {
      console.warn(`Location ${location.name} does not have a display element registered.`);
      return;
    }
    this.locationContainer?.appendChild(locationDisplay);
  }

  /**
   * Updates the display with the current date.
   */
  displayDate(date: DateRepresentation) {
    if (!this.dateContainer) return;
    this.dateContainer.innerHTML = `
      <ul class="date-display">
        <li class="year date-display-metric"><span class="label">Year:</span> <span class="date-value">${date.year + 2013}</span></li>
        <li class="month date-display-metric"><span class="label">Month:</span> <span class="date-value">${months[date.month]}</span></li>
        <li class="day date-display-metric"><span class="label">Day:</span> <span class="date-value">${date.day + 1}</span></li>
      </ul>
    `;
  }

}

/**
 * ========================================================================================
 * HELPER FUNCTIONS
 * ========================================================================================
 */

/**
 * Creates an HTML DIV container and adds it to the DOM
 */
function createContainer(
  id: string,
  classes: string[],
  styles?: Record<string, string> | null,
  attributes?: Record<string, string | number> | null,
): HTMLDivElement {
  const container = document.createElement('div');
  container.setAttribute('id', id);
  container.classList.add(...classes);
  if (styles) {
    for (const prop in styles) {
      container.style[prop as any] = styles[prop];
    }
  }
  if (attributes) {
    for (const attr in attributes) {
      if (typeof attributes[attr] === 'number') {
        attributes[attr] = `${attributes[attr]}`;
      }
      container.setAttribute(attr, attributes[attr]);
    }
  }
  document.body.appendChild(container);
  return container;
}
