import World from './components/World';
import Location from './components/places/Location';

export const simulation1 = () => {

  const world = new World();
  const jon = world.addPerson({ name: "John Smith", sex: "M", age: 29 });
  const sue = world.addPerson({ name: "Susan Robinson", sex: "F", age: 26 });

  const
    canada = world.addLocation('Canada'),
    usa = world.addLocation("United States of America");

  const
    personGroup = [jon, sue],
    locationGroup = [canada, usa];

  jon.migrateTo(usa);
  sue.migrateTo(canada);

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

  // countries.set('canada', world.addLocation('Canada'));
  // countries.set('usa', world.addLocation('United States of America'));
  // countries.set('mexico', world.addLocation('Mexico'));
  // countries.set('trinidad_and_tobago', world.addLocation('Trinidad and Tobago'));
  // countries.set('jamaica', world.addLocation('Jamaica'));
  // countries.set('guyana', world.addLocation('Guyana'));
  // countries.set('bahamas', world.addLocation('Bahamas'));
  // countries.set('barbados', world.addLocation('Barbados'));
  // countries.set('united_kingdom', world.addLocation('United Kingdom'));
  // countries.set('france', world.addLocation('France'));
  // countries.set('italy', world.addLocation('Italy'));
  // countries.set('greece', world.addLocation('Greece'));
  // countries.set('russia', world.addLocation('Russia'));
  // countries.set('china', world.addLocation('China'));
  // countries.set('japan', world.addLocation('Japan'));
  // countries.set('korea', world.addLocation('Korea'));
  // countries.set('india', world.addLocation('India'));
  // countries.set('pakistan', world.addLocation('Pakistan'));
  // countries.set('nigeria', world.addLocation('Nigeria'));
  // countries.set('ethiopia', world.addLocation('Ethiopia'));
  // countries.set('south_africa', world.addLocation('South Africa'));
  // countries.set('kenya', world.addLocation('Kenya'));
  // countries.set('uganda', world.addLocation('Uganda'));
  // countries.set('afghanistan', world.addLocation('Afghanistan'));
  // countries.set('iran', world.addLocation('Iran'));
  // countries.set('new_zealand', world.addLocation('New Zealand'));
  // countries.set('australia', world.addLocation('Australia'));

  const countryList = [
    "Canada", "United States of America", "Mexico", "Trinidad and Tobago", "Jamaica", "Guyana",
    "Bahamas", "Barbados", "United Kingdom", "France",
    "Italy", "Greece", "Russia", "China", "Japan",
    "Korea", "India", "Pakistan", "Nigeria", "Ethiopia",
    "South Africa", "Kenya", "Uganda", "Afghanistan",
    "Iran", "New Zealand", "Australia", "Dominican Republic", "Republic of Congo",
  ];

  countryList.forEach(name => {
    const key = Location.abbreviate(name, (n, p, k) => p.includes('trinidad') ? 'trinidad' : k);
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

export default {
  simulation1
};
