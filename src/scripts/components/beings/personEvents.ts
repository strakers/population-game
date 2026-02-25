import Person from './Person';

class PersonEvent extends Event {
  #person: Person|null = null;
  #message: string = '';;

  setPerson(person: Person) {
    this.#person = person;
  }

  setMessage(message: string) {
    this.#message = message;
  }

  get person(): Person {
    if (!this.#person) throw new Error('Person data is missing.')
    return this.#person;
  }

  get message(): string {
    return this.#message;
  }

  get target(): HTMLElement | null {
    return this.person.getDisplayElement();
  }
}

export class PersonStatusChangeEvent extends PersonEvent {
  constructor(person: Person, message: string = '') {
    super('personStatusChange');
    this.setPerson(person);
    this.setMessage(message);
  }
}
