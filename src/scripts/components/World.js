import Person from './Person';
import Location from './Location';
import System from './System';
import { addEntity } from "../support/utility";

export default class World {
  universe = window;
  persons = new Map();
  locations = new Map();
  countries = new Map();
  cities = new Map();
  system;

  constructor() {
    this.universe.worlds = this.universe.worlds || [];
    this.universe.worlds.push(this);
    this.system = new System();
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
