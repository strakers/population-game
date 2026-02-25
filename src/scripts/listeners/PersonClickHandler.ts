import EventHandler from "./EventHandler";
import Person from "../components/beings/Person";

export default class PersonClickHandler extends EventHandler {
  static eventName = 'click';

  static effect(e: Event): void {
    const person = this as unknown as Person;
    console.log(person.__toString(), e);
  }
}
