import DateSystem from './systems/DateSystem';
import DisplaySystem from './systems/DisplaySystem';
import RegistrationSystem from './systems/RegistrationSystem';
import Person from './beings/Person';
import { Country } from './places/Location';
import type { DateRepresentation } from './systems/dateEvents';

export default class World {

  // systems
  #time = new DateSystem(1000, this);
  #display = new DisplaySystem(this);
  #database = new RegistrationSystem(this);

  // data stores
  #persons = new Map;
  #locations = new Map;

  constructor() {
    window.world = this;
  }

  /* @returns {DateSystem} */
  get clock() {
    return this.#time;
  }

  /* @returns {DisplaySystem} */
  get display() {
    return this.#display;
  }

  /* @returns {RegistrationSystem} */
  get database() {
    return this.#database;
  }

  /**
   * Adds a person to the world.
   */
  addPerson(person: Person | string): Person {
    // Create person if a string was passed.
    if (!(person instanceof Person)) {
      person = new Person(person);
      person.triggerChangeEvent('Person created');
    }

    // Check if the person is already registered in the world.
    if (this.#persons.has(person.name)) {
      throw new Error(`Person with name ${person.name} already exists`);
    }

    // Register the person in the world and add them to the display.
    this.#persons.set(person.name, person);
    console.log(`Person type of name ${person.name} has been created.`);
    this.database.register(person);
    this.display.displayPerson(person);
    return person;
  }

  /**
   * Adds a location to the world.
   * @var {Country} location
   */
  addLocation(location: string | Country) {
    // Create location if a string was passed.
    if (!(location instanceof Country)) {
      location = new Country(location);
    }

    // Check if the location is already registered in the world.
    if (this.#locations.has(location.name)) {
      throw new Error(`Country with name ${location.name} already exists`);
    }

    // Register the location in the world and add it to the display.
    this.#locations.set(location.name, location);
    console.log(`Country type of name ${location.name} has been created.`);
    this.display.displayLocation(location);
    return location;
  }

  /**
   * Retrieves the total count of the world's population.
   * @returns {number}
   */
  get population() {
    return this.#persons.size;
  }

  /**
   * Retrieves the world's current date.
   */
  getCurrentDate(): DateRepresentation {
    return this.clock.getDate();
  }

  /**
   * Starts the world's time progression. Returns false if the timer was already running, and true if it was successfully started.
   */
  start(): boolean {
    if (this.clock.isRunning) return false;
    this.clock.startTime();
    return true;
  }

  /**
   * Stops the world's time progression. Returns false if the timer was already stopped, and true if it was successfully stopped.
   */
  stop(): boolean {
    if (!this.clock.isRunning) return false;
    this.clock.stopTime();
    return true;
  }

  /**
   * Sets the world's time progression speed. The interval is in seconds, and will be converted to milliseconds for the timer.
   */
  setSpeed(interval = 1): void {
    this.clock.changeSpeed(interval * 1000);
  }
}
