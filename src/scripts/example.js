import World from './components/World';

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

export default {
  simulation1
};
