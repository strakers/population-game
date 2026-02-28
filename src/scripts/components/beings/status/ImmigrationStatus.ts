import { Country } from '../../places/Location';
import type Person from '../Person';

export default class ImmigrationStatus {
  #locations: Country[] = [];
  #origin: Country | null = null;
  #person: Person | null = null;

  constructor(person: Person) {
    this.#person = person;
  }

  /**
   * Adds a location to the being's history of locations.
   */
  addLocation(location: Country) {
    this.#locations.push(location);

    if (this.#person) {
      // Update previous location's list for population counts.
      if (this.previousLocation) {
        this.previousLocation.unregisterPerson(this.#person);
      }

      // Update current location's list for population counts.
      location.registerPerson(this.#person);
    }

    // If this is the first location added, it is also set as the person's place of origin.
    if (!this.#origin) {
      this.#origin = location;
    }
  }

  /**
   * Returns the person's history of locations, in order of visitation.
   */
  getLocations(): Country[] {
    return this.#locations;
  }

  /**
   * Returns the previous location of the person, or null if the person has not moved or only has one location in their history.
   */
  get previousLocation(): Country|null {
    return this.#locations.length > 1
      ? this.#locations[this.#locations.length - 2]
      : null;
  }

  /**
   * Returns the person's current location, or null if the person has not been assigned any locations.
   */
  get currentLocation(): Country|null {
    return this.#locations.length > 0
      ? this.#locations[this.#locations.length - 1]
      : null;
  }

  /**
   * Returns the person's place of origin, or null if the person has not been assigned any locations.
   */
  get placeOfOrigin(): Country|null {
    return this.#origin;
  }
}
