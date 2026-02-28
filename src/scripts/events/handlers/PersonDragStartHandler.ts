import EventHandler from "./EventHandler";
import Person from "../../components/beings/Person";

export default class PersonDragStartHandler extends EventHandler {
  static eventName = 'dragstart';

  static effect(event: DragEvent): void {
    const person = this as unknown as Person;

    if (event.dataTransfer) {
      // event.dataTransfer.setData('text/plain', person.name);
			event.dataTransfer.setData("person", person.name);
			event.dataTransfer.setData("personID", person.systemId);
      // event.dataTransfer.effectAllowed = 'move';
    } else {
      console.warn('Drag event does not support data transfer.');
    }
  }
}
