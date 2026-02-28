import EventHandler from "./EventHandler";
import Location from "../../components/places/Location";

/**
 * Displays the location's population count on click.
 */
export default class LocationClickHandler extends EventHandler {
  static eventName = 'click';

  static effect(e: Event): void {
    const location = this as unknown as Location;
    console.log(`The population of ${location.name} is currently ${location.population}.`);
  }
}
