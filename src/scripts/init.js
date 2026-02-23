import World from './components/World';
import Person from './components/Person';

; (function () {

  document.body.innerHTML = "";
  document.body.innerHTML = "<ul><li>Drag a man onto a woman to make a new person.</li><li>Drag a person onto a country to make them a resident.</li></ul><hr />";

  const personHolder = document.createElement("div");
  personHolder.setAttribute('id','people');
  document.body.appendChild(personHolder);

  const locHolder = document.createElement("div");
  locHolder.setAttribute('id','locations');
  document.body.appendChild(locHolder);

  const timeHolder = document.createElement("div");
  timeHolder.setAttribute('id','time');
  document.body.appendChild(timeHolder);
  timeHolder.style.clear = 'both';

  const world = new World();
  const
    john = world.addPerson({name: "John Smith", sex: "M", age: 29}),
    sue = world.addPerson({name: "Susan Robinson", sex: "F", age: 26}),
    loli = world.addPerson({name: "Loli Robinson",sex: "F", age: 32}),
    paul = world.addPerson({name: "Paul McDonald",sex: "M", age: 24}),
    lisa = world.addPerson({name: "Lisa LaFleur",sex: "F", age: 31}),
    jack = world.addPerson({name: "Jack Robinson",sex: "M", age: 39}),
    rob = world.addPerson({name: "Rob Ford",sex: "M", age: 51}),
    personGroup = [john, loli, paul, sue, lisa, jack, rob];

  //sue.addNickname( "Sue" );
  //john.meet(sue);

  const
    canada = world.addLocation('Canada'),
    usa = world.addLocation("United States of America"),
    locationGroup = [canada, usa];

  window.world = world;
})();