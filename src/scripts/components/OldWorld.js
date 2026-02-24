import Person from './Person';
import Location from './Location';
import DateSystem from './systems/DateSystem';
import DisplaySystem from './systems/DisplaySystem';
import RegistrationSystem from './systems/RegistrationSystem';
import {default as OldSystem} from './System';
import { addEntity } from "../support/utility";
import Canvas from './Canvas';
import dateEvents from './systems/dateEvents';

/**
 * @deprecated */
export class OldWorld {
  universe = window;
  persons = new Map();
  locations = new Map();
  countries = new Map();
  cities = new Map();
  system;
  canvas;

  constructor() {
    this.universe.worlds = this.universe.worlds || [];
    this.universe.worlds.push(this);
    this.system = new OldSystem(this);
    this.canvas = new Canvas(this);
  }

  /**
   * Returns a reference to the system contained
   * @returns
   */
  getSystem() {
    return this.system;
  }

  /**
   * Returns a reference to the canvas contained
   * @returns {Canvas}
   */
  getCanvas() {
    return this.canvas;
  }

  /**
   * Adds a person to the world
   * @var {Person|string} person
   * @returns {Person}
   */
  addPerson(person) {
    addEntity(person, Person, this.persons);
    return person;
  }

  /**
   * Adds a location to the world
   * @var {Location|string} location
   */
  addLocation(location) {
    addEntity(location, Location, this.locations);
    return location;
  }

  /**
   * Retrieves a person from the world records
   * @var {string} name
   * @returns {?Person}
   */
  getPerson(name) {
    return this.persons.get(name);
  }

  /**
   * Retrieves a location from the world records
   * @var {string} name
   * @returns {?Location}
   */
  getLocation(name) {
    return this.locations.get(name);
  }

  /**
   * Retrieves a list of all registered locations
   * @returns {Person[]}
   */
  getPersons() {
    return [...this.persons.values()];
  }

  /**
   * Retrieves a list of all registered locations
   * @returns {Location[]}
   */
  getLocations() {
    return [...this.locations.values()];
  }

  /**
   * Retrieves the total count of the world's population
   * @returns {number}
   */
  getPopulation() {
    return this.persons.size();
  }

  dropPerson(nameOrRef) { }
  dropLocation(nameOrRef) { }

}


export default class World {

  // systems
  #time = new DateSystem(1000, this);
  #display = new DisplaySystem(this);
  #database = new RegistrationSystem(this);

  // managers
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
   * @var {Person} person
   * @returns {Person}
   */
  addPerson(person) {
    addEntity(person, Person, this.#persons);
    return person;
  }

  /**
   * Adds a location to the world.
   * @var {Location} location
   */
  addLocation(location) {
    addEntity(location, Location, this.#locations);
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
   * @returns {import('./systems/dateEvents').DateRepresentation}
   */
  getCurrentDate() {
    return this.#time.getDate();
  }

  /**
   * Starts the world's time progression. Returns false if the timer was already running, and true if it was successfully started.
   * @returns {boolean}
   */
  start() {
    if (this.#time.isRunning()) return false;
    this.#time.startTime();
    return true;
  }

  /**
   * Stops the world's time progression. Returns false if the timer was already stopped, and true if it was successfully stopped.
   * @returns {boolean}
   */
  stop() {
    if (!this.#time.isRunning()) return false;
    this.#time.stopTime();
    return true;
  }

  /**
   * Sets the world's time progression speed. The interval is in seconds, and will be converted to milliseconds for the timer.
   * @param {*} interval
   * @returns {void}
   */
  setSpeed(interval = 1) {
    this.#time.changeSpeed(interval * 1000);
  }
}