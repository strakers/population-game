import Named from "../primitives/Named";
import Person from "../beings/Person";
import World from "../World";

/**
 * A location is a place that can contain people and other locations. It can be a country, state, city, etc.
 */
export default class Location extends Named {

  #parentLocation: Location|World|null = null;
  #persons = new Map<string, Person>();
  #locations = new Map<string, Location>();
  #displayElement: HTMLElement|null = null;

  constructor(name: string, parentLocation: Location|World|null = null) {
    super();

    this.setName(name);
    this.#parentLocation = parentLocation;
    this.#displayElement = document.createElement('div');
    this.#displayElement.setAttribute('id', this.abbreviation);
    this.#displayElement.classList.add(...['is-location', `type-${this.constructor.name.toLowerCase()}`]);
    this.#displayElement.setAttribute('data-name', this.name);
  }

  getPeople(): Map<string, Person> {
    return this.#persons;
  }

  getPlaces(): Map<string, Location> {
    return this.#locations;
  }

  /**
   * Retrieves the being's display element, which is used to represent the being in the UI.
   */
  getDisplayElement(): HTMLElement | null {
    return this.#displayElement;
  }

  /**
   * Retrieves the total count of the location's population.
   */
  get population() {
    return this.#persons.size;
  }

  /**
   * Retrieves the parent location of this location.
   */
  get parentLocation(): Location|World|null {
    return this.#parentLocation;
  }

  /**
   * Adds a person to the location's population
   */
  registerPerson(person: Person): Location {
    this.#persons.set(person.name, person);
    return this;
  }

  /**
   * Removes a person from the location's population
   */
  unregisterPerson(person: Person): Location {
    this.#persons.delete(person.name);
    return this;
  }

  /**
   * Adds a subordinate location to this location's list
   */
  addPlace(place: Location): Location {
    this.#locations.set(place.name, place);
    return this;
  }

  /**
   * Removes a subordinate place from this location's list
   */
  removePlace(place: Location): Location {
    this.#locations.delete(place.name);
    return this;
  }

  get abbreviation(): string {
    const limit = 2;
    const parts = this.name.split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, limit).toUpperCase();
    }
    return this.name.split(' ')
      .map(word => word[0])
      .slice(0, limit)
      .join('')
      .toUpperCase();
  }
}

/**
 * ========================================================================================
 * CHILD IMPLEMENTATIONS
 * ----------------------------------------------------------------------------------------
 * These are all types of locations that can be used to create a hierarchical structure of
 * places in the world. They can contain people and other locations, and can be used to
 * track population and other data related to the places in the world.
 * ========================================================================================
 */

/** Country is a type of location. */
export class Country extends Location {
  get abbreviation(): string {
    if (this.name.includes(' ')) {
      return this.name.match(/\b[A-Z]/g)?.join('').toLowerCase() || '';
    }

    const match = this.name.match(/^\w{3}/);
    return match ? match[0].toLowerCase() : '';
  }
}


/** Province/State is a type of location found within a country. */
export class ProvState extends Location { }


/** City/Town is a types of location found within a state/province. */
export class CityTown extends Location { }
