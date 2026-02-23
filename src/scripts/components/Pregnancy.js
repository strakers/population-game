import { randomize, generateFirstName } from "../support/utility";
import Person from "./Person";

export default class Pregnancy {
  months = 0;
  duedate = 0;
  sexOfChild;

  /** @type Person */
  carrier;

  /** @type Person */
  donor;

  constructor(carrier, donor = null) {
    // assign pregnancy roles
    this.carrier = carrier;
    this.donor = donor;
    this.sexOfChild = randomize(['M', 'F']);

    // define estimated duedate
    this.estimatedDuedate = 8 + randomize(2);

    // update carrier's body display
    this.updateDisplayShowSignsOfPregnancy();
    document.addEventListener('monthIncreament', (e) => this.monthIncrement(e));
  }

  /**
   * Progress the pregnancy by a month
   * @returns {void}
   */
  advance() {
    this.months++;

    // add a level of unpredictability to birth date (each month)
    const dueMonth = 8 + randomize(2);

    if (this.months >= dueMonth) {
      // create new person and assign to the world
      const child = new Person({
        name: `${generateFirstName(this.sexOfChild)} ${this.donor?.getLastName() || this.carrier.getLastName()}`,
        sex: this.sexOfChild,
        mother: this.carrier,
        father: this.donor,
        color: this.donor ? (this.donor.getColor() + this.carrier.getColor()) / 2 : this.carrier.getColor(),
      });

      // assign child to carrier and donor
      this.donor?.addChild(child);
      this.carrier.addChild(child);

      // update carrier's state and body display
      this.carrier.pregnancy = null;
      this.updateDisplayRemoveSignsOfPregnancy();
      document.removeEventListener('monthIncrement', this.monthIncrement);

      console.log(`${this.carrier.name} has given birth to a ${child.getSex() === 'M' ? 'boy' : 'girl'}! The child was given the name "${child.getFirstName()}".`)
    }
  }

  /**
   * Get the current month of the pregnancy
   * @returns {number}
   */
  getMonth() {
    return this.months;
  }

  /**
   * Get the current trimester (stage) of the pregnancy
   * @returns {number}
   */
  getStage() {
    return Math.ceil((this.months > 9 ? 9 : this.months) / 3);
  }

  monthIncrement(event) {
    console.log(`${this.carrier.name}'s pregnancy has increased by a month`);
    this.advance();
  }

  updateDisplayShowSignsOfPregnancy() {
    this.carrier.getBody()?.setAttribute('data-pregnant',true);
  }

  updateDisplayRemoveSignsOfPregnancy() {
    this.carrier.getBody().removeAttribute('data-pregnant');
  }
}