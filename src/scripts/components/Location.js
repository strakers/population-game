import World from "./World";
import Person from "./Person";
import { addEntity, generateCountryCode, drawLocation } from "../support/utility";

export default class Location {
  name;
  parent;
  locations = new Map();
  persons = new Map();
  departures = [];
  arrivals = [];
  color;

  /**
   *
   * @param {*} name
   * @param {*} parent
   */
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;

    this.color = this.getAbbreviation() == 'can' ? '#c00' : (this.getAbbreviation() == 'usa' ? '#07f' : '#333');

    drawLocation(this);
  }

  /**
   * Adds a person to the world
   * @var Person|string person
   */
  addPerson(person) {
    addEntity(person, Person, this.persons);
    return person;
  }

  removePerson(person) {
    this.persons.delete(person.name);
  }

  /**
   * Adds a location to the world
   * @var Location|name location
   */
  addLocation(location) {
    addEntity(location, Location, this.locations);
    return location;
  }

  getName() {
    return this.name;
  }

  getAbbreviation() {
    return generateCountryCode(this.name);
  }

  getColor() {
    return this.color;
  }

  getPopulation() {
    return this.persons.size;
  }
}