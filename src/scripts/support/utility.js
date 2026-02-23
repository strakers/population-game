import { boyNames, girlNames, surnames } from "./constants";
import Person from "../components/Person";
import Location from "../components/Location";

/**
 * Helper function to scaffold creating entities
 * @param {mixed} entity
 * @param {object} objectType
 * @param {Map} objectMap
 * @returns {boolean}
 */
export function addEntity(entity, objectType, objectMap) {
  if (typeof entity === 'string') {
    entity = new objectType(entity);
  }

  if (!(entity instanceof objectType)) {
    entity = new objectType(entity);
    //throw new TypeError("Invalid type passed to function.")
  }

  if (objectMap.has(entity.name)) {
    throw new Error(`${objectType.name} with name ${entity.name} already exists`);
  }

  objectMap.set(entity.name, entity);
  console.log(`${objectType.name} type of name ${entity.name} has been created.`);
  return true;
}

/**
 *
 * @param {Person} person
 * @returns {HTMLDivElement}
 */
export function drawPerson(person) {
  if (!(person instanceof Person)) {
    throw new TypeError("Invalid type passed to function. Expected Person type.")
  }

  // create person HTML and add them to the display
  const personElement = document.createElement('div');
  document.querySelector('#people').appendChild(personElement);

  personElement.classList.add(...['person', person.getGender()]);
  personElement.style.float = 'left';
  personElement.style.backgroundColor = person.getColorHex();
  personElement.setAttribute('data-name', person.name);
  personElement.setAttribute('draggable', true);
  personElement.ondragstart = function(e){
    e.dataTransfer.setData("person", e.target.getAttribute('data-name'));
    console.log('dragstart', e.target.getAttribute('data-name'));
  }
  personElement.ondragover = function(e){
    e.preventDefault();
  }
  personElement.ondrop = function(e){
    e.preventDefault();
    const name = e.dataTransfer.getData("person"),
      person = world.getPerson(name),
      dragTarget = person.body,
      dropTarget = e.target;

    if (dragTarget.essence.isMale() && dropTarget.essence.isFemale()) {
      alert(`${dragTarget.essence.getName()} had relations with ${dropTarget.essence.getName()}...`);
      if (dropTarget.essence.canGetPregnant() && Math.floor(Math.random() * 3) % 2 === 0) {
        dropTarget.essence.becomePregnant(dragTarget.essence);
        alert(`${dropTarget.essence.getName()} got pregnant!`);
      }
      // dropTarget.essence.makeChildWith( dragTarget.essence );
    }
  }

  personElement.onclick = function () { console.log('profile:', person.export()); alert( person.__toString() ); if( personElement.essence.name === 'Rob Ford' ) alert ('Drunken stupor...'); };
  personElement.essence = person;
  person.setBody(personElement);

  if( personElement.essence.getLocation() ){
    const flag = document.createElement("div"),
      flagClass = personElement.essence.getLocation().name == 'United States of America'
        ? 'usa'
        : personElement.essence.getLocation().name.toLowerCase();

    flag.classList.add(flagClass);
    personElement.innerHTML = '';
    personElement.appendChild(flag);
  }

  console.log(`Person named ${person.name} has been drawn.`);
  return personElement;
}

/**
 *
 * @param {Location} location
 * @returns {HTMLDivElement}
 */
export function drawLocation(location) {
  if (!(location instanceof Location)) {
    throw new TypeError("Invalid type passed to function. Expected Location type.")
  }

  // create location HTML and add them to the display
  const locationElement = document.createElement('div');
  document.querySelector('#locations').appendChild(locationElement);

  locationElement.classList.add(...['location', 'country', location.getAbbreviation()]);
  locationElement.setAttribute('id',location.getAbbreviation());
  locationElement.innerHTML = location.getName();
  locationElement.style.backgroundColor = location.getColor();
  locationElement.area = location;
	locationElement.ondragover = function(e){ e.preventDefault(); }
  locationElement.ondrop = (e) => {
		e.preventDefault();
    const name = e.dataTransfer.getData("person"),
      person = world.getPerson(name),
      dragTarget = person.body,
      dropTarget = e.target,
      countryName = dropTarget.id;
    let
      oldCountry = person.getLocation(),
      newCountry = dropTarget.area,
      flag;

    if (oldCountry) oldCountry.removePerson(person);
    newCountry.addPerson(person);

    console.log('migration', oldCountry, newCountry)

		flag = document.createElement('div');
		flag.classList.add(...['flag', countryName]);
		dragTarget.innerHTML = '';
		dragTarget.appendChild(flag);
		dragTarget.essence.migrateTo( dropTarget.area );
  }

	locationElement.onclick = function(){ alert( 'Population: '+ location.getPopulation() ); }

  console.log(`Location named ${location.name} has been drawn.`);
  return locationElement;
}

/**
 *
 * @param {Location} location
 * @returns {string}
 */
export function generateCountryCode(location) {
  if (location instanceof Location) {
    location = location.name;
  }

  if (location.includes(' ')) {
    return location.match(/\b[A-Z]/g).join('').toLowerCase();
  }

  const match = location.match(/^\w{3}/);
  return match ? match[0].toLowerCase() : null;
}

/**
 * @overload
 * @param {number} options
 * @param {number} weightingFunction
 * @returns {number}
 */
/**
 * @overload
 * @param {mixed[]} options
 * @param {?function} weightingFunction
 * @returns {mixed}
 */
/**
 * Resolves a random number between the given options
 * @param {number|mixed[]} options
 * @param {number|function|null} weightingFunction
 * @returns {number|mixed}
 */
export function randomize(options, weightingFunction = null) {
  // get random number between
  if (typeof options === 'number' && (!weightingFunction || typeof weightingFunction === 'number')) {
    return randomNumber(options, weightingFunction);
  }

  if (options.constructor !== Array.prototype.constructor) {
    throw new TypeError("Incorrect argument type provided. Must be an array.");
  }

  let index = Math.floor(Math.random() * options.length);
  if (index === options.length) index--;
  if (weightingFunction && typeof weightingFunction == 'function') {
    index = weightingFunction(index);
  }
  return options[index];
}

/**
 *
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
export function randomNumber(max, min = null) {
  const
    lower_limit = min || 0,
    upper_limit = max - lower_limit;
  return Math.floor(Math.random() * upper_limit) + lower_limit;
}

export function generateFirstName(byGender = null) {
  let names;
  if (byGender && ['M', 'F'].includes(byGender)) {
    names = byGender === 'M' ? boyNames : girlNames;
  }
  else {
    names = [...boyNames, ...girlNames];
  }

  return randomize(names);
}

export function generateSurname() {
  return randomize(surnames);
}

export default {
  addEntity,
  randomize,
  drawPerson,
  drawLocation,
  generateFirstName,
  generateCountryCode,
};