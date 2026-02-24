import { v4 as uuidv4 } from 'uuid';
import { months } from '../support/constants';
import Time from './Time';

/** @deprecated */
export default class System {
  /** @type {Time} */
  time;

  /** @type {World} */
  world;

  constructor(world) {
    this.time = new Time(20_000, this);
    this.world = world;
  }

  /**
   * Assigns a person a unique ID for use within the containing world
   * @param {Person} person
   * @returns {void}
   */
  register(person) {
    const id = uuidv4();
    person.setSystemId(id, this);
  }

  /**
   * Returns a reference to the containing world
   * @returns {World}
   */
  getWorld() {
    return this.world;
  }

}