import Named from "../primitives/Named";

export default abstract class Being extends Named {
  #alive: boolean = false;
  #displayElement:HTMLDivElement|null = null;
  #age: number = 0;

  /**
   * Determines if the being is alive.
   */
  get isAlive(): boolean {
    return this.#alive;
  }

  /**
   * Determines if the being is dead.
   */
  get isDead(): boolean {
    return !this.isAlive;
  }

  /**
   * Sets the alive status of the being
   */
  setAliveStatus(alive: boolean) {
    this.#alive = alive;
  }

  /**
   * Retrieves the age of the being.
   */
  get age(): number {
    return this.#age;
  }

  /**
   * Sets the age of the being.
   */
  setAge(value: number) {
    this.#age = value;
  }

  /**
   * Starts the life of person. To be called when person is born.
   */
  startLife(): void {
    this.setAliveStatus(true);
  }

  /**
   * Ends the life of person. To be called when person dies.
   */
  endLife(): void {
    this.setAliveStatus(false);
  }

  /**
   * Retrieves the being's display element, which is used to represent the being in the UI.
   */
  getDisplayElement(): HTMLDivElement|null {
    return this.#displayElement;
  }

  /**
   * Registers a display element for the being.
   * This should be called in the constructor of any class that extends Being, and the element should be customized as needed before being registered.
   * The element will be appended to the appropriate container in the DisplaySystem when the being is displayed.
   */
  registerDisplayElement(): void {
    this.#displayElement = document.createElement('div');
  }

}