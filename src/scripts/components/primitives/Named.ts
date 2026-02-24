import type World from "../World";

export default abstract class Named {
  #name: string = '';

  /**
   * Defines a name for the given entity
   */
  setName(name: string) {
    this.#name = name;
  }

  /**
   * Retrieve's the given entity's name
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Exports a snapshot of this entity's metadata
   */
  export(): any[] {
    return [
      this.#name,
    ]
  }

  /**
   * Stringifies the export of this entity's metadata
   */
  __toString(): string {
    return this.export().filter((x) => x).join(' / ');
  }
}


// Extend the Window interface to include 'world'
declare global {
  interface Window {
    world: World
  }
}