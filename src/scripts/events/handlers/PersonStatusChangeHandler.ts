import EventHandler from "./EventHandler";
import { PersonStatusChangeEvent } from "../../components/beings/personEvents";
import Person from "../../components/beings/Person";

/**
 * Listen for status changes on the person's display element to update the display accordingly.
 */
export default class PersonStatusChangeHandler extends EventHandler {
  static eventName = 'personStatusChange';

  static effect(event: PersonStatusChangeEvent): void {
    if (!(event instanceof PersonStatusChangeEvent)) return;

    // Update the person's display accordingly.
    const person = this as unknown as Person;
    const classes = person.getDisplayClasses();
    if (event.target && event.target instanceof HTMLElement) {
      event.target.className = classes.join(' ');
    }
    else {
      console.warn(`Person ${person.name} does not have a display element registered. Cannot update display classes.`);
    }
  }
}
