import EventListener from "./EventListener";
import Person from "../components/beings/Person";

export default class PersonClickListener extends EventListener {
  static eventName = 'click';

  static effect(e: Event): void {
    const person = this as unknown as Person;
    console.log(person.__toString(), e);
  }
}
