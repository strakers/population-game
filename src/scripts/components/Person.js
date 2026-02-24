
import { randomize, drawPerson } from "../support/utility";
import Pregnancy from "./Pregnancy";
import System from "./System";

/**
 * Create a new Person
 * @class
 * @deprecated
 */
export default class Person {
  /** @type {string} */
  name;

  /** @type {'M'|'F'} */
  sex;

  /** @type {string} */
  gender;

  /** @type {number} in years */
  age = 0;

  /** @type {number} in kg */
  weight = 0;

  /** @type {number} - decimal representation of hex color value */
  color;

  /** @type {?Location} */
  birthLocation;

  /** @type {Location} */
  currentLocation;

  /** @type {?Location} */
  previousLocation;

  birthDate;
  deathDate;

  /** @type {HTMLDivElement} */
  sprite;

  /** @type {boolean} */
  _isAlive = true;

  /** @type {boolean} */
  _canGetPregnant = false;

  /** @type {?Pregnancy} */
  pregnancy = null;

  /** @type {Person[]} */
  children = [];

  /** @type {?Person} */
  mother;

  /** @type {?Person} */
  father;

  /** @type {Map<string, Person>} */
  friends = new Map();

  constructor(props) {
    if (typeof props === 'string') {
      props = { name: props };
    }

    if (typeof props !== 'object') {
      throw new TypeError('Incorrect type of argument passed to constructor. Must be string or object.')
    }

    if (!Object.hasOwn(props, 'name')) {
      throw new Error('Person must have a name specified, none provided.')
    }

    this.name = props.name;
    this.sex = props?.sex || randomize(['M','F'], (n) => n % 2 == 1);
    this.gender = this.sex; // to review other genders at a later time - leaving binary for now
    this.age = props?.age || 0;
    this.weight = props?.weight || randomize(11, 5); // measured in kg
    this.birthLocation = props?.birthLocation || props?.mother?.getLocation() || null;
    this.birthDate = props?.birthDate || new Date;
    this.color = props?.color || randomize(16_777_215, 3_000_000);
    this.mother = props?.mother;
    this.father = props?.father;
    this._canGetPregnant = this.sex === 'F' && randomize(10) !== 6;
    this.pregnancy = null;

    // draw on canvas
    drawPerson(this);

    // handle
    document.addEventListener('yearIncrement', (e) => this.incrementAge());
  }

  /**
   * Registers person with a unique ID within the system
   * @param {string} id
   * @param {System} system
   */
  setSystemID(id, system) {
    if (system.constructor !== System.prototype.constructor) {
      throw new Error('Unable to produce system ID outside of system process');
    }

    this.systemID = id;
  }

  /**
   * Assigns an HTML element to this person
   * @param {HTMLElement} element
   * @returns {void}
   */
  setSprite(element) {
    this.sprite = element;
  }

  /**
   * Access the containing HTML element
   * @returns {HTMLElement}
   */
  getSprite() {
    return this.sprite;
  }

  /**
   * Assigns an HTML element to this person
   * @param {HTMLElement} element
   * @returns {void}
   * @deprecated during development
   */
  setBody(element) {
    this.setSprite(element);
  }

  /**
   * Access the containing HTML element
   * @returns {HTMLElement}
   * @deprecated during development
   */
  getBody() {
    return this.getSprite();
  }

  getName() {
    return this.name;
  }

  /**
   * Interprets person's first name from the current name
   * @returns {string}
   */
  getGivenName() {
    return this.name.split(' ').shift();
  }

  /**
   * Interprets person's first name from the current name
   * @returns {string}
   * @deprecated during development
   */
  getFirstName() {
    return this.getGivenName();
  }

  /**
   * Interpres person's last name form the current name
   * @returns {string}
   */
  getSurname() {
    return this.name.split(' ').pop();
  }

  /**
   * Interpres person's last name form the current name
   * @returns {string}
   * @deprecated during development
   */
  getLastName() {
    return this.getSurname();
  }

  /**
   *
   * @returns {number}
   */
  getColor() {
    return this.color;
  }

  /**
   * Returns the hex string representation of the person's color
   * @returns {string}
   */
  getColorHex() {
    return '#' + this.getColor().toString(16).toUpperCase();
  }

  /**
   * Determines whether the person is alive
   * @returns boolean
   */
  isAlive() {
    return this._isAlive;
  }

  /**
   * Advances the person's age by a year
   * @returns {void}
   */
  incrementAge() {
    this.age++;

    // determine max age for life
    if (this.age >= randomize(110, 75)) {
      this._isAlive = false;
      alert(`${this.name} has died... rest in peace.`);
    }
  }

  /**
   * Starts the life of person. To be called when person is born.
   * @returns {void}
   */
  startLife() {}

  /**
   * Ends the life of person. To be called when person dies.
   * @returns {void}
   */
  endLife() {}

  /**
   *
   * @returns {boolean}
   */
  canGetPregnant() {
    return this._canGetPregnant;
  }

  /**
   *
   * @returns {boolean}
   */
  isPregnant() {
    return this.canGetPregnant() && !!this.pregnancy;
  }

  /**
   *
   * @param {?Person} donor
   * @returns {void}
   */
  becomePregnant(donor = null) {
    if (!this.canGetPregnant()) {
      throw new Error(`${this.name} cannot become pregnant, unfortunately.`)
    }
    if (this.isPregnant()) {
      throw new Error(`${this.name} is already pregnant!`)
    }

    this.pregnancy = new Pregnancy(this, donor);
    console.log('got pregnant!', this.pregnancy, this.pregnancy.getMonth(), this.isPregnant());
  }

  /**
   * Registers a child
   * @param {Person} child
   */
  addChild(child) {
    this.children.push(child);
  }

  /**
   * Determines whether the person has children
   * @returns {boolean}
   */
  hasChildren() {
    return this.children.length > 0;
  }

  /**
   * Retrieves the gender of person.
   * @todo Implement gender system
   * @returns {string}
   */
  getGender() {
    return this.gender || '';
  }

  /**
   *
   * @returns {'M'|'F'}
   */
  getSex() {
    return this.sex;
  }

  /**
   *
   * @returns {boolean}
   */
  isMale() {
    return this.sex === 'M';
  }

  /**
   *
   * @returns {boolean}
   */
  isFemale() {
    return this.sex === 'F';
  }

  /**
   * Returns the person's current location of residency
   * @returns {Location}
   */
  getLocation() {
    return this.location;
  }

  /**
   * Immigrates the person to a new location
   * @param {Location} location
   * @returns {void}
   */
  migrateTo(location) {
    this.location = location;
    console.log(`${this.name} has moved to ${location.name}`);
  }

  /**
   * Determines if this person knows another person
   * @param {Person} person
   * @returns {boolean}
   */
  knows(person) {
    const personName = (typeof person === 'string') ? person : person.name;
    return this.friends.has(personName);
  }

  /**
   * Introduces this person to another person
   * @param {Person} stranger
   * @param {Location} location
   */
  meet(stranger, location) {
    if (!this.isAlive() || !stranger.isAlive()) {
      throw new Error('Deceased persons cannot meet in this world');
    }

    if (this.friends.has(stranger.name)) {
      throw new Error(`${stranger.name} is already known to ${this.name}`);
    }

    this.friends.set(stranger.name, stranger);
    stranger.meet(this);
  }

  /**
   * Exports a snapshot of this person's metadata
   * @returns {mixed[]}
   */
  export() {
    return [
      this.name,
      this.sex,
      this.age + 'yrs',
      this.isAlive() ? 'alive' : 'deceased',
      this.isPregnant() ? `${this.pregnancy?.getMonth()} months pregnant` : '',
      this.hasChildren() ? `${this.children.length} ${this.children.length===1?'child':'children'}` : ''
    ]
  }

  /**
   * Stringifies the export of this person's metadata
   * @returns {string}
   */
  __toString() {
    return this.export().filter((x) => x).join(' / ');
  }
}