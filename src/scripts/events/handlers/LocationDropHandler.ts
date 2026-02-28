import EventHandler from "./EventHandler";
import Location from "../../components/places/Location";

export default class LocationDropHandler extends EventHandler {
  static eventName = 'drop';

  static effect(event: DragEvent): void {
    event.preventDefault();
    const place = this as unknown as Location;

    if (!event.dataTransfer) {
      console.warn('Drop event does not support data transfer.');
      return;
    }

    const personID = event.dataTransfer.getData('personID');
    if (!personID) {
      console.warn("Cannot retrieve person's registration ID");
      return;
    }

    const person = window.world.database.lookup(personID);
    if (!person) {
      console.warn("Subject could not be retrieved from system database.");
      return;
    }

    console.log(`Dropped data: ${person.name} onto ${place.name}`);
    person.migrateTo(place);
  }
}
