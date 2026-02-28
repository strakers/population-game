import EventHandler from "./EventHandler";
// import Location from "../../components/places/Location";

/**
 * Turns location element into a drop target by cancelling the DragOver event.
 */
export default class LocationDragOverHandler extends EventHandler {
  static eventName = 'dragover';

  static effect(event: Event): void {
    event.preventDefault();
  }
}
