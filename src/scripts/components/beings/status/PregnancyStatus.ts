import { randomize, generateFirstName } from "../../../support/utility";
import { type DateRepresentation } from "../../systems/dateEvents";
import { minMonthsOfPregnancy } from "../../../support/constants";
import Person, { type Sex } from "../Person";

export default class PregnancyStatus {
  #isActive = false;
  #startDate: DateRepresentation | null = null
  #monthsProgressed = 0;
  #estimatedDuration = 0; // in months
  #incrementListener: () => void;

  #sexOfChild: Sex = 'O';
  #carrier: Person|null = null;
  #donor: Person|null = null;

  constructor(carrier: Person, donor: Person | null = null) {
    if (!carrier) {
      throw new Error("Carrier must be a valid Person instance");
    }

    if (!carrier.isAlive) {
      throw new Error("Carrier must be alive to become pregnant");
    }

    if (!carrier.canGetPregnant) {
      throw new Error("Carrier is not able to get pregnant");
    }

    // assign pregnancy roles
    this.#carrier = carrier;
    this.#donor = donor;
    this.#sexOfChild = randomize(['M', 'F']);

    // Get start date of pregnancy
    this.#startDate = window.world.getCurrentDate();

    // Define estimated duration of pregnancy (in months) with some variability
    this.#estimatedDuration = minMonthsOfPregnancy + randomize(2); // typically around ~9 months
    this.#isActive = true;

    // Listen for year increments to update age
    this.#incrementListener = () => {
      console.log('advance pregancy', this.currentMonth)
      this.advance();
    }
    this.setEventListeners();
  }

  setEventListeners() {
    document.addEventListener('monthIncrement', this.#incrementListener);
  }

  unsetEventListeners() {
    document.removeEventListener('monthIncrement', this.#incrementListener);
  }

  /**
   * Progress the pregnancy by a month
   * @returns {void}
   */
  advance() {
    this.#monthsProgressed++;

    if (!this.#isActive) {
      throw new Error('Pregnancy is no longer active');
    }

    if (!this.#carrier) {
      throw new Error("Carrier is not defined for this pregnancy");
    }

    // add a level of unpredictability to birth date (each month)
    const dueMonth = minMonthsOfPregnancy + randomize(2);

    if (this.#monthsProgressed >= dueMonth) {
      // create new person and assign to the world
      const child = new Person({
        name: `${generateFirstName(this.#sexOfChild)} ${this.#donor?.lastName || this.#carrier.lastName}`,
        sex: this.#sexOfChild,
        mother: this.#carrier,
        father: this.#donor,
        color: this.#donor ? (this.#donor.color + this.#carrier.color) / 2 : this.#carrier.color,
      });
      child.startLife();
      window.world.addPerson(child);

      // assign child to carrier and donor
      this.#carrier.assignChild(child);
      this.#donor?.assignChild(child);

      // update carrier's state and body display
      this.#isActive = false;
      this.unsetEventListeners();
      this.#carrier.endPregnancy();

      console.log(`${this.#carrier.name} has given birth to a ${child.sex === 'M' ? 'boy' : 'girl'}! The child was given the name "${child.firstName}".`)
    }
  }

  /**
   * Get the current month of the pregnancy
   */
  get currentMonth(): number {
    return this.#monthsProgressed;
  }

  /**
   * Get the current trimester (stage) of the pregnancy
   */
  get currentStage(): number {
    return Math.ceil((this.currentMonth > 9 ? 9 : this.currentMonth) / 3);
  }

  get startDate(): DateRepresentation | null {
    return this.#startDate;
  }

  get dueDate(): DateRepresentation | null {
    if (!this.#startDate) return null;

    const dueMonth = this.#estimatedDuration;
    const dueYear = this.#startDate.year + Math.floor((this.#startDate.month + dueMonth) / 12);
    const dueMonthAdjusted = (this.#startDate.month + dueMonth) % 12;
    const dueWeekAdjusted = this.#startDate.week; // will ususally be incorrect but we can adjust it later if needed

    return {
      year: dueYear,
      month: dueMonthAdjusted,
      week: dueWeekAdjusted,
      day: this.#startDate.day,
    };
  }
}
