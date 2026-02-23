import { v4 as uuidv4 } from 'uuid';
import { months } from '../support/constants';
import Time from './Time';

export default class System {
  /**
   * @var {Time} Time
   */
  Time;

  /**
   * @var {World} world
   */
  world;

  /**
   *
   * @param {World} world
   */
  constructor(world) {
    this.Time = new Time(20_000, this);
    this.world = world;
  }

  register(person) {
    const id = uuidv4();
    person.setSystemId(id, this);
  }

  getWorld() {
    return this.world;
  }

}