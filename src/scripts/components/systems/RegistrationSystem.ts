import { v4 as uuidv4 } from 'uuid';
import System from './System';
import type Person from '../beings/Person';

export default class RegistrationSystem extends System {
  // both are used for performance gains: it is quicker to read a Set than it is to read the keys of a Map.
  #usedIDs = new Set();
  #registry = new Map();

  /**
   * Assigns a person a unique ID for use within the containing world
   */
  register(person: Person) {
    const id = this.#generateID();
    person.setSystemId(id, this);
    this.#usedIDs.add(id);
    this.#registry.set(id, person);
  }

  /**
   * Generates a unique ID within the system.
   */
  #generateID(): string {
    let id = uuidv4();
    while (this.#usedIDs.has(id)) {
      id = uuidv4();
    }
    return id;
  }


  /**
   * Retrieves a person based on their identifier.
   */
  lookup(id: string): Person | null {
    return this.#registry.get(id);
  }

}
