import World from "../World";

export default class System {
  #world: World;

  constructor(world: World) {
    this.#world = world;
  }

  get world() {
    return this.#world;
  }
}