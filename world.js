
//World.prototype = Location.prototype;

var moo;

var world, john, sue, loli, paul, lisa, group;
var ontario, toronto, windsor, canada, newyork, usa, uk;

window.onload = function(){

	 document.body.innerHTML = "";
	 document.body.innerHTML = "<ul><li>Drag a man onto a woman to make a new person.</li><li>Drag a person onto a country to make them a resident.</li></ul><hr />";
	 
	 var personHolder = document.createElement("div");
	 personHolder.setAttribute('id','people');
	 document.body.appendChild( personHolder );
	 
	 var locHolder = document.createElement("div");
	 locHolder.setAttribute('id','locations');
	 document.body.appendChild( locHolder );
	 
	 world = new World();
	 john = world.addPerson( "John Smith", "M", 29 );
	 sue = world.addPerson( "Susan Robinson", "F", 26 );
	//sue.addNickname( "Sue" );
	//john.meet(sue);
	 loli = world.addPerson("Loli Robinson","F",32);
	 paul = world.addPerson("Paul McDonald","M",24);
	 lisa = world.addPerson("Lisa LaFleur","F",31);
	 jack = world.addPerson("Jack Robinson","M",39);
	 rob = world.addPerson("Rob Ford","M",51);
	 group = [ john, loli, paul, sue, lisa ];
	 
	 world.divideAndConquer( countries );
	 
	 /*
	 ontario = world.addLocation('Canada').addLocation('Ontario'); 
	 toronto = ontario.addLocation("Toronto");
	 windsor = ontario.addLocation("Windsor");
	 canada = world.getLocation("Canada");
	 newyork = world.addLocation("United States of America").addLocation("New York");
	 usa = world.getLocation("United States of America");
	 uk = world.addLocation("United Kingdom");
	//sue.passAway(); 
	*/
	
	var canada = world.getLocation('Canada')
	canada.land = document.createElement('div');
	canada.land.className = "country can";
	canada.land.setAttribute('id','canada');
	canada.land.innerHTML = 'Canada';
	canada.land.style.backgroundColor = "#c00";
	canada.land.ondragover = function(e){ e.preventDefault(); }
	canada.land.ondrop = function(e){
		e.preventDefault();
		var name = e.dataTransfer.getData("person"), 
			person = world.getPerson(name), 
			dragTarget = person.body,
			dropTarget = e.target,
			countryName = dropTarget.id,
			country = '',
			flag;
		console.log(country,person);
		flag = document.createElement('div');
		flag.className = 'flag '+countryName;
		dragTarget.innerHTML = '';
		dragTarget.appendChild(flag);
		dragTarget.essence.goTo( dropTarget.place );
	}
	canada.land.onclick = function(){ alert( 'Population: '+ canada.population() ); }
	canada.land.place = canada;
	document.getElementById('locations').appendChild( world.getLocation('Canada').land );
	
	var usa = world.getLocation('United States of America');
	usa.land = document.createElement('div');
	usa.land.className = "country can";
	usa.land.setAttribute('id','usa');
	usa.land.innerHTML = 'United States of America';
	usa.land.style.backgroundColor = "#07f";
	usa.land.ondragover = function(e){ e.preventDefault(); }
	usa.land.ondrop = function(e){
		e.preventDefault();
		var name = e.dataTransfer.getData("person"), 
			person = world.getPerson(name), 
			dragTarget = person.body,
			dropTarget = e.target,
			countryName = dropTarget.id,
			country = '',
			flag;
		console.log(country,person);
		flag = document.createElement('div');
		flag.className = 'flag '+countryName;
		dragTarget.innerHTML = '';
		dragTarget.appendChild(flag);
		dragTarget.essence.goTo( dropTarget.place );
	}
	usa.land.onclick = function(){ alert( 'Population: '+ usa.population() ); }
	usa.land.place = usa;
	document.getElementById('locations').appendChild( world.getLocation('United States of America').land );
}