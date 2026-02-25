import EventHandler from "./EventHandler";
import Person from "../../components/beings/Person";

export default class PersonDropHandler extends EventHandler {
  static eventName = 'drop';

  static effect(event: DragEvent): void {
    event.preventDefault();
    const recipient = this as unknown as Person;

    if (!event.dataTransfer) {
      console.warn('Drop event does not support data transfer.');
      return;
    }

    const personID = event.dataTransfer.getData('personID');
    if (!personID) {
      console.warn("Cannot retrieve person's registration ID");
      return;
    }

    const subject = window.world.database.lookup(personID);
    if (!subject) {
      console.warn("Subject could not be retrieved from system database.");
      return;
    }

    console.log(`Dropped data: ${subject.name} onto ${recipient.name}`);
  }
}
