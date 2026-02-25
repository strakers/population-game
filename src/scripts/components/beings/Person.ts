import type { DateRepresentation } from '../systems/dateEvents';
import ImmigrationStatus from './status/ImmigrationStatus';
import { PersonStatusChangeEvent } from './personEvents';
import PregnancyStatus from './status/PregnancyStatus';
import { randomize } from '../../support/utility';
import Being from './Being';
import RegistrationSystem from '../systems/RegistrationSystem';
import { Country } from '../places/Location';

export default class Person extends Being {

  // profile
  #sex: Sex = 'O';
  #gender: string = '';
  #weight: number = 0;
  #color: number = 0;

  // registration
  #systemId: string | null = null;

  // immigration tracker
  #immigration = new ImmigrationStatus(this);

  // personal dates
  #birthDate: DateRepresentation | null = null;
  #deathDate: DateRepresentation | null = null;

  // family
  #mother: Person | null = null;
  #father: Person | null = null;
  #children: Person[] = [];

  // fertility
  #canGetPregnant: boolean = false;
  #pregnancy: PregnancyStatus | null = null;


  constructor(props: string | PersonProps) {
    super();

    if (typeof props === 'string') {
      props = { name: props };
    }

    // Set person properties based on provided props
    this.setName(props.name);
    this.setAge(props.age || 0);
    this.#sex = props.sex || randomize(['M','F'], (n: number) => n % 2 == 1);;
    this.#gender = props.gender || this.#sex;
    this.#weight = props.weight || randomize(11, 5); // measured in kg;
    this.#color = props.color || randomize(16_777_215, 3_000_000);
    if (props.location) this.#immigration.addLocation(props.location);
    this.#mother = props.mother || null;
    this.#father = props.father || null;

    // Create a physical representation of the person for display and interactions.
    this.registerDisplayElement();

    // Predetermine person's future fertility.
    if (this.#sex === 'F') {
      this.#canGetPregnant = true;
    }

    // Listen for year increments to update age
    document.addEventListener('yearIncrement', () => {
      if (this.isAlive) {
        this.setAge(this.age + 1);
      }
    });
  }

  get firstName(): string {
    return this.name.split(' ')[0];
  }

  get lastName(): string {
    const parts = this.name.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  setSystemId(id: string, system: RegistrationSystem) {
    if (!(system instanceof RegistrationSystem)) {
      throw new Error('Unable to produce system ID outside of system process');
    }
    this.#systemId = id;
  }

  get systemId(): string {
    if (!this.#systemId) {
      throw new Error('Person has not been registered to a system yet');
    }
    return this.#systemId;
  }

  get sex(): Sex {
    return this.#sex;
  }

  get gender(): string {
    return this.#gender;
  }

  get weight(): number {
    return this.#weight;
  }

  get color(): number {
    return this.#color;
  }

  get colorHex(): string {
    return `#${this.#color.toString(16).padStart(6, '0')}`;
  }

  get birthDate(): DateRepresentation | null {
    return this.#birthDate;
  }

  get deathDate(): DateRepresentation | null {
    return this.#deathDate;
  }

  get canGetPregnant(): boolean {
    return this.#canGetPregnant;
  }

  get isPregnant(): boolean {
    return this.#pregnancy !== null;
  }

  get pregnancyStatus(): PregnancyStatus | null {
    return this.#pregnancy;
  }

  get hasChildren(): boolean {
    return this.#children.length > 0;
  }

  get isImmigrant(): boolean {
    return this.#immigration.getLocations().length > 1;
  }

  get isResident(): boolean {
    return this.#immigration.getLocations().length > 0;
  }

  /**
   * Starts the life of person. To be called when person is born.
   */
  startLife() {
    super.startLife();
    this.#birthDate = window.world.getCurrentDate();

    // Emit event to display birth of person
    this.triggerChangeEvent('Person born');
  }

  /**
   * Ends the life of person. To be called when person dies.
   */
  endLife() {
    super.endLife();
    this.#deathDate = window.world.getCurrentDate();

    // Emit event to display death of person
    this.triggerChangeEvent('Person died');
  }

  /**
   * Migrates the person to a new location, adding it to their immigration history.
   * @param location
   */
  migrateTo(location: Country) {
    // If person is already registered to the country, exit gracefully
    if (this.#immigration.currentLocation === location) {
      console.warn(`${this.name} is already registered to ${location.name}.`);
      return;
    }

    // Register user with the country.
    this.#immigration.addLocation(location);

    // Emit event to display a new place of residence for the person
    this.triggerChangeEvent('Person migrated');
  }

  get mother(): Person | null {
    return this.#mother;
  }

  get father(): Person | null {
    return this.#father;
  }

  get children(): Person[] {
    return this.#children;
  }

  startPregnancy(donor: Person | null = null) {
    if (!this.canGetPregnant) {
      throw new Error("Person is not able to get pregnant");
    }

    if (this.isPregnant) {
      throw new Error("Person is already pregnant");
    }

    // Assign pregancy tracker.
    this.#pregnancy = new PregnancyStatus(this, donor);

    // Emit event to update carrier's display with signs of pregnancy.
    this.triggerChangeEvent('Pregnancy started');
  }

  endPregnancy() {
    if (!this.isPregnant) {
      throw new Error("Person is not currently pregnant");
    }

    //. Remove pregnancy tracker.
    this.#pregnancy = null;

    // Emit event to update carrier's display with signs of pregnancy.
    this.triggerChangeEvent('Pregnancy ended');
  }

  assignChild(child: Person) {
    this.#children.push(child);

    // Emit event to display new parenthood.
    this.triggerChangeEvent('Child assigned');
  }

  setMother(mother: Person) {
    this.#mother = mother;
  }

  setFather(father: Person) {
    this.#father = father;
  }

  /**
   * Registers the person's display element in the UI and starts their life.
   * Overrides method from the base class.
   */
  registerDisplayElement(): HTMLDivElement {
    super.registerDisplayElement();
    super.startLife();

    const div = this.getDisplayElement();
    if (!div) {
      throw new Error("Failed to register display element for person");
    }

    div.setAttribute('id', this.#systemId || Math.random().toString(36).substring(2, 9));
    div.classList.add(...this.getDisplayClasses());
    div.setAttribute('data-name', `${this.name}`);
    div.style.backgroundColor = this.colorHex;

    return div;
  }

  /**
   * Returns an array of CSS classes to apply to the person's display element, based on their current status and attributes.
   */
  getDisplayClasses(): string[] {
    const classes = ['is-person'];
    classes.push(this.isAlive ? 'is-alive' : 'is-dead');
    classes.push(`sex-${this.#sex.toLowerCase()}`);
    if (this.isPregnant) classes.push('is-pregnant');
    if (this.hasChildren) classes.push('has-children');
    if (this.isResident) classes.push('is-resident', `from-${this.#immigration.currentLocation?.abbreviation || 'unknown'}`);
    // age-based classes
    if (this.age < 2) classes.push('is-infant');
    if (this.age >= 2 && this.age < 13) classes.push('is-child');
    if (this.age >= 13 && this.age < 20) classes.push('is-teen');
    if (this.age >= 20 && this.age < 65) classes.push('is-adult');
    if (this.age >= 65) classes.push('is-elderly');
    return classes;
  }

  /**
   * Triggers a custom event to notify the UI of a change in the person's status, such as birth, death, pregnancy, etc.
   */
  triggerChangeEvent(message: string) {
    const event = new PersonStatusChangeEvent(this, message);
    this.getDisplayElement()?.dispatchEvent(event);
  }

  /**
   * Exports a snapshot of this person's metadata
   */
  export(): (string | number | boolean)[] {
    return [
      this.name,
      this.sex,
      this.age + 'yrs',
      this.isAlive ? 'alive' : 'deceased',
      this.#immigration.currentLocation ? this.#immigration.currentLocation.name : '',
      this.isPregnant ? `${this.#pregnancy?.currentMonth} months pregnant` : '',
      this.hasChildren ? `${this.children.length} ${this.children.length===1?'child':'children'}` : ''
    ]
  }

}

export type Sex = 'M' | 'F' | 'O';

export interface PersonProps {
  name: string;
  age?: number;
  sex?: Sex;
  gender?: string;
  weight?: number;
  color?: number;
  location?: Country;
  mother?: Person;
  father?: Person | null;
}
