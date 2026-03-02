import World from './components/World';
import Location from './components/places/Location';
import { getFlag, processCountryNameExceptions, countryList } from './support/flags';

export const simulation1 = () => {

  const world = new World();
  const jon = world.addPerson({ name: "John Smith", sex: "M", age: 29 });
  const sue = world.addPerson({ name: "Susan Robinson", sex: "F", age: 26 });

  const
    personGroup = [jon, sue],
    locationGroup = [
      world.addLocation('Canada'),
      world.addLocation("United States of America")
    ];

  jon.migrateTo(locationGroup[1]);
  sue.migrateTo(locationGroup[0]);

  return {
    world,
    personGroup,
    locationGroup,
  }
}

export const simulation2 = () => {

  const world = new World();
  const people = new Map;
  const countries = new Map;

  people.set('jon', world.addPerson({ name: "John Smith", sex: "M", age: 29 }));
  people.set('sue', world.addPerson({ name: "Susan Robinson", sex: "F", age: 26 }));

  console.log('flags', getFlag('canada'));

  countryList.forEach(name => {
    const key = Location.slugify(name, processCountryNameExceptions);
    countries.set(key, world.addLocation(name, key));
  });

  console.log('people', [...people.keys()])
  console.log('countries', [...countries.keys()])

  return {
    world,
    people,
    countries,
  }
}
