import EventHandler from "./EventHandler";
import Person from "../../components/beings/Person";
import { randomize } from "../../support/utility";

export default class PersonDropHandler extends EventHandler {
  static eventName = 'drop';

  /**
   * {@inheritdoc}
   */
  static effect(event: DragEvent): void {
    event.preventDefault();
    const recipient = this as unknown as Person;

    if (!event.dataTransfer) {
      console.warn('Drop event does not support data transfer.');
      return;
    }

    // Attempt to retrieve a person's system ID from the action event information.
    const personID = event.dataTransfer.getData('personID');

    if (personID) {
      // Handle case when a person is dropped on another person.
      const subject = window.world.database.lookup(personID);

      if (subject) {
        // trigger couple interaction
        triggerCoupleInteraction(subject, recipient);
      }
    }

    // Next possible case
    // Handle case when a {X} is dropped on a person.
    // ...
  }

}

// ==========================================================================================
// SUPPORT FUNCTIONS
// ==========================================================================================


/**
 * Trigger an intimate interaction between two persons. This may or may not result in conception.
 * @param {Person} subject
 * @param {Person} recipient
 * @returns {void}
 */
function triggerCoupleInteraction(subject: Person, recipient: Person): void {

  console.log(`${subject.name} has relations with ${recipient.name}... ;)`);

  // From here, we determine if pregnancy is possible.
  const conceptionIsInTheCards = randomize([true, false, false]); // ~33.33% chance
  const couple = [subject, recipient];

  // Determine which of the [pair] can get pregnant.
  const possibleCarrier = couple.find((person) => person.canGetPregnant && !person.isPregnant);

  // Determine which of the [pair] is the donor.
  const donor = couple.find((person) => person !== possibleCarrier);

  // Reasons for why pregnancy is not possible.
  if (subject.sex === recipient.sex) return;
  if (!conceptionIsInTheCards) return;
  if (!possibleCarrier) return;
  if (!donor) return;

  // Pregnancy is possible!
  console.log(`${possibleCarrier.name} has become pregnant!`);
  possibleCarrier.startPregnancy(donor);
}

