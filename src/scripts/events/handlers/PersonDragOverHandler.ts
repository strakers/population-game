import EventHandler from "./EventHandler";
// import Person from "../../components/beings/Person";

/**
 * Turns person element into a drop target by cancelling the DragOver event.
 */
export default class PersonDragOverHandler extends EventHandler {
  static eventName = 'dragover';

  static effect(event: Event): void {
    event.preventDefault();
  }
}
