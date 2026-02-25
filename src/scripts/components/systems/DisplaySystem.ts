import { PersonStatusChangeEvent } from "../beings/personEvents";
import { DateChangeEvent, type DateRepresentation } from "./dateEvents";
import Person from "../beings/Person";
import System from "./System";
import World from "../World";
import { months, baseYear } from "../../support/constants";
import type { Country } from "../places/Location";
import type EventHandler from "../../events/handlers/EventHandler";
import PersonClickHandler from "../../events/handlers/PersonClickHandler";
import PersonDragStartHandler from "../../events/handlers/PersonDragStartHandler";
import PersonStatusChangeHandler from "../../events/handlers/PersonStatusChangeHandler";
import PersonDragOverHandler from "../../events/handlers/PersonDragOverHandler";
import PersonDropHandler from "../../events/handlers/PersonDropHandler";

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
      console.log(`Date updated to ${months[e.data.month]} ${e.data.day}, ${e.data.year + baseYear}`);
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

    // Adds person to the display.
    this.personContainer?.appendChild(personDisplay);
    personDisplay.setAttribute('draggable', 'true');

    // Adds click listener to the person's display element to log their current status.
    const handlers: (typeof EventHandler)[] = [
      PersonStatusChangeHandler,
      PersonClickHandler,
      PersonDragStartHandler,
      PersonDragOverHandler,
      // PersonDragEndHandler,
      PersonDropHandler,
    ];
    handlers.forEach(handler => handler.applyTo(person));

    // // Adds drag and drop functionality to the person's display element for moving between locations.
    // personDisplay.addEventListener('dragend', (e) => {
    //   // Handle any cleanup after dragging if necessary.
    //   console.log(`Finished dragging ${person.name}`,e);
    // });
    // personDisplay.addEventListener('drop', (e) => {
    //   e.preventDefault();
    //   const name = e.dataTransfer?.getData('text/plain');
    //   const type = e.dataTransfer?.getData('type');
    //   if (type === 'person') {
    //     console.log(`Dropped person ${name}`);
    //   }
    // });
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

    // Adds location to the display.
    this.locationContainer?.appendChild(locationDisplay);

    // Displays the location's population count onclick.
    locationDisplay.addEventListener('click', (e) => {
      console.log(`The population of ${location.name} is currently ${location.population}.`);
    });
  }

  /**
   * Updates the display with the current date.
   */
  displayDate(date: DateRepresentation) {
    if (!this.dateContainer) return;
    this.dateContainer.innerHTML = `
      <ul class="date-display">
        <li class="year date-display-metric"><span class="label">Year</span> <span class="date-value">${date.year + baseYear}</span></li>
        <li class="month date-display-metric"><span class="label">Month</span> <span class="date-value">${months[date.month]}</span></li>
        <li class="day date-display-metric"><span class="label">Day</span> <span class="date-value">${date.day}</span></li>
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
