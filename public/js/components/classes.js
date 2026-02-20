import { System, makeHolder } from "./globals.js";

export function World(){
	var universe = window,
		people = [],
		personID = {},
		locations = [],
		locationID = {},
		countries = [],
		countryID = {},
		cities = [],
		cityID = {};

	this.addPerson = function(){
		var args = Array.prototype.slice.apply(arguments)||[];
		//if(!args[0]) return this; console.log('world.addPerson','args',args);
		var person;
		if(args.length && args[0].constructor == Person){
			person = args[0];
			if(!personID[person.name]){
				people.push(person);
				personID[person.name] = person; /* handles only 1 person with same name */
			}
			return person;
		} else {
			function P( Args ){ return Person.apply(this, Args); }
			P.prototype = Person.prototype;
			person = new P(arguments);
			if(!personID[person.name]){
				people.push(person);
				personID[person.name] = person; /* handles only 1 person with same name */
			}
			return person;
		}
	}
	this.addLocation = function(){ // *
		var args = Array.prototype.slice.apply(arguments);
		if(!args[0]) return this;
		var location;
		if(args[0].constructor == Location){
			location = args[0];
			if(!locationID[location.name]){
				locations.push(location);
				locationID[location.name] = location; /* handles only 1 location with same name */
			}
			return location;
		} else {
			function L(args){ return Location.apply(this, args); }
			L.prototype = Location.prototype;
			location = new L( [args[0],this] );
			if(!locationID[location.name]){
				locations.push(location);
				locationID[location.name] = location; /* handles only 1 location with same name */
			}
			return location;
		}
		/**/ console.log( 'this is world', arguments[0], arguments[1] );
	}
	this.removeLocation = function( location ){

	}
	this.personArrive = function( person ){
		if(this !== person.getLocation()){
			if( !~_.findIndex( people, [person] ) ){
				people.push( person );
			}
		}
		return this;
	}
	this.personLeave = function( person ){
		if(this === person.getLocation()){
			if( ~_.findIndex( people, [person] ) ){
				_.remove( people, function(i){ return i==person; });
			}
		}
		return this;
	}
	this.getPerson = function( personName ){
		return personID[personName];
	}
	this.getLocation = function( locationName ){
		return locationID[locationName];
	}
	this.population = function(){
		return people.length;
	}
	this.locations = function(){
		return locations.length;
	}
	this.listLocations = function(){
		return locations;
	}
	this.listAllLocations = function(){
		var locs = [],
			recurse = function( locArray ){
				if(locArray.constructor == Array){
					for(var i=0;i<locArray.length;++i){
						if( locArray[i].constructor == Location && typeof locArray[i]['listLocations'] == "function" ){
							locs.push( locArray[i] );
							recurse( locArray[i].listLocations() );
						}
					}
				}
			}
		recurse( locations );
		return locs;
	}
	this.personDatabase = function( person ){
		if(!person) return people;
		else if(typeof person === 'string') return personID[person];
		else if( person.constructor == Person ) return _.find( people, person );
		return null;
	}
	this.divideAndConquer = function( group ){
		var n;
		function compile( obj, par ){
			var newpar;
			if( par.constructor !== World && par.constructor !== Location ) return;
			if( obj.constructor === Array.prototype.constructor ){
				for(var c in obj){
					if( typeof obj[c] !== 'object' ) continue;
					if( obj[c].constructor === Array.prototype.constructor ) continue;
					if( !obj[c].name ) continue;
					/*
					newpar = par.addLocation( obj[c].name );
					if( !!obj[c].children && obj[c].children.constructor === Array.prototype.constructor ){
						compile( obj[c].children, newpar );
						newpar = undefined;
					}
					n++;	*/
					compile( obj[c], par );
				}
			} else if( typeof obj === 'object' ) {
				if (!obj.name) return;
				newpar = par.addLocation( obj.name ); /* indicator */ n++;
				var txt = document.createElement( "p" ); txt.innerHTML = par.name + " > " + obj.name + "<br />";
				//document.getElementById('locations').appendChild( txt );
				if( !!obj.children && obj.children.constructor === Array.prototype.constructor ){
					compile( obj.children, newpar );
				}
			}
		}
		compile( group, this );
		return this;
	}
	this.findLocation = function( location, listAll ){
		var allLocations = this.listAllLocations(), result;
		if( typeof location === 'string' ){
			result = _( allLocations ).where({ name : location }).value();
			return listAll ? result : result[0];
		}
		else if( location && location.constructor == Location ){
			result = _( allLocations ).where( location ).value();
			return listAll ? result : result[0];
		}
		return;
	}
}

export function Location ( name, parentLocation ){
	var locations = [], locationID = {}, people = [], personID = {}, _super, departures = [], arrivals = [];
	_super = parentLocation;
	//if(!!_super && _super.constructor != World && _super.constructor != Location ) return { error: "LocationError", args: [name,parentLocation] };
	this.name = name;
	//this.parent = _super; // will consider if is wise to expose publicly
	if(_super && Object.hasOwn(_super, 'addLocation')){ _super.addLocation( this, _super ); }
	this.addLocation = function(){ /*
		if( place.constructor == Location ){
			if(!locationID[ place.name ]){
				locations.push( place.name );
				locationID[ place.name ] = [ place, _super ];
				_super.addLocation( place, this );
			}
		}
		return place;*/
		var args = Array.prototype.slice.apply(arguments);
		if(!args[0]) return this;
		var location;
		if(args[0].constructor == Location){
			location = args[0];
			if(!locationID[location.name]){
				locations.push(location);
				locationID[location.name] = location; /* handles only 1 location with same name */
			}
			return location;
		} else {
			function L(args){ return Location.apply(this, args); }
			L.prototype = Location.prototype;
			location = new L( [args[0],this] );
			if(!locationID[location.name]){
				locations.push(location);
				locationID[location.name] = location; /* handles only 1 location with same name */
			}
			return location;
		}
	}
	this.removeLocation = function( lcoation ){

	}
	this.addPerson = function(){ /*
		if( person.constructor == Person ){
			if(!personID[ person.name ]){
				personID[ person.name ] = [ person, this ];
				people.push( person.name );
				_super.addPerson( person, this );
			}
		}
		return person;*/
		var args = Array.prototype.slice.apply(arguments);
		if(!args[0]) return this;
		var person;
		if(args[0].constructor == Person){
			person = args[0];
			if(!personID[person.name]){
				people.push(person);
				personID[person.name] = person; /* handles only 1 person with same name */
			}
			_super.addPerson( person );
			return person;
		} else {
			function P( Args ){ return Person.apply(this, Args); }
			P.prototype = Person.prototype;
			person = new P(arguments);
			if(!personID[person.name]){
				people.push(person);
				personID[person.name] = person; /* handles only 1 person with same name */
			}
			_super.addPerson( person );
			return person;
		}
	}
	this.getPerson = function( person ){
		if(typeof person == "string"){ person = this.getPersonID( person ); }
		if(person.constructor == Person){
			for(var i in people){
				if( people[i] == person ) return people.slice(i,1);
			}
		}
		return false;
	}
	this.getPersonID = function( personName ){
		return personID[personName];
	}
	this.getLocation = function( locationName ){
		return locationID[locationName];
	}
	this.population = function(){
		return people.length;
	}
	this.locations = function(){
		return locations.length;
	}
	this.getAllLocations = function(){ return [locations, locationID]; }
	this.listLocations = function(){
		return locations;
	}
	this.changeParentLocation = function( parent ){
		if( parent.constructor == Location ||  parent.constructor == World ){
			_super.removeLocation( this );
			_super = parent;
			_super.addLocation( this );
		}
		return this;
	}
	this.personLeave = function( person, destinationLocation ){
		if(person.constructor == Person){
			var i, p;
			for(i in people){
				if( people[i] == person ){
					p = people.splice(i,1);
					departures.push( { person: person, destination: destinationLocation, time: new Date() } );
					return people.splice(i,1);
				}
			}
			console.log( person.name + ' is not here...' )
		}
	}
	this.personArrive = function( person, sourceLocation ){
		if(person.constructor == Person){
			var isNewPerson = true, i;
			for(i in people){
				if( people[i] == person ){ isNewPerson = false; break; }
			}
			if( isNewPerson ){
				if(!personID[person.name]) personID[person.name] = person;
				people.push(person);
				arrivals.push( { person: person, source: sourceLocation, time: new Date() } );
			} else {
				console.log( person.name + ' is already here!', i )
			}
		}
	}
}

export function Person( name, gender, age, weight, birthLocation, birthDate, color ){
	var friendsID = {}, friendsList = [],
		nameParts = [],
		nicknames = [],
		greetings = ["Hello there,", "Hey there,", "Hi", "Yo", "Wassup","Hey","Bonjour","Hey!","How you doing","How's it going","Howdy.","Hello..."],
		pleasantries = [ "", "Nice to meet you.", "It's a pleasure.", "Very nice to meet you.", "Pleasure to meet you.", "That's a lovely name." ],
		firstTimeMeetings = {},
		birthday,
		birthplace,
		children = [],
		currentLocation,
		previousLocation,
		complexion,
		father,
		deathday,
		isPregnant = false,
		pregnancyStage = -1,
		pregnancyData = {},
		isAlive = true,
		isDiverced = false,
		systemID,
		_defaults,
		_r = function( maxNumber ){ return Math.floor(Math.random()*maxNumber); },
		_rv = function( arr, level ){
			if( arr.length ){
				var r =  _r(arr.length), n;
				switch( level ){
					case 'r': return _rv( arr, _r(4) );
					case 3: r += _r(arr.length - r); r -= _r(arr.length - r); r += _r(arr.length - r); break;
					case 2: r = ( (n = r + _r(arr.length)) < arr.length ? n : n - _r(arr.length) );
					case 1: arr.length - r + _r( arr.length - r*(r%2) );
					default: break;
				}
				return arr[ r ];
			}
			return null;
		}
		;

	/* object property assignment */
	if( typeof arguments[0] === "object" && arguments[0].constructor !== Array.prototype.constructor ){
		var props = arguments[0];
		if( props.name && props.name.constructor === Array.prototype.constructor ) props.name = props.name.join(' ');
		name = props.name || null;
		gender = props.gender || null;
		age = props.age || null;
		weight = props.weight || null;
		birthLocation = props.birthLocation || props.mother.getLocation() || null;
		birthDate = props.birthDate || null;
		color = props.complexion || null;
		father = props.father || null;
	}

	this.gender = gender || (_r(4)%2==1?"M":"F");
	this.name = name || _rv( System.firstNames(this.gender === "F") ) + " " + (father ? father.lastName() : _rv(System.firstNames(2)));
	nameParts = this.name.split(' ');
	this.weight = weight || _r(6) + 5;

	complexion = color || Math.floor(Math.random()*16777215);
	if(typeof complexion === "number") complexion = complexion.toString(16);
	if(complexion.length < 6) complexion = "0"+complexion;
	birthplace = birthLocation;
	birthday = birthDate || ( age == 0 ? new Date() : new Date( (new Date()).getFullYear() - age, Math.floor(Math.random()*11), Math.floor(Math.random()*27)+1 ) );

	if( typeof birthplace == "string" && !world.findLocation( birthplace ) ){
		birthplace = world.addLocation( birthplace );
	}
	if( !!birthplace && birthplace.constructor != Location ) birthplace = null;
	currentLocation = birthplace;

	this.isAlive = function(){ return isAlive === true; }
	this.isMale = function(){ return this.gender == "M"; }
	this.isFemale = function(){ return this.gender == "F"; }
	this.wasBornOn = function(){ return birthday; }
	this.knows = function( person ){ return !!( person.constructor == Person && friendsID[person.name] && person === friendsID[person.name]); }
	this.getName = function( type ){ switch( type ){ default: return this.name; case 1: return nameParts[0]; case 2: return nameParts[nameParts.length-1]; } }
	this.systemID = function(){ return systemID; }

	System.Time.registerEvent( birthday.getMonth(), this.getName(), true, this, 'birthday' );

	this.goTo = function( newLocation ){
		if(newLocation.constructor == Location){
			previousLocation = currentLocation;
			if(currentLocation && currentLocation.constructor == Location) currentLocation.personLeave( this );
			currentLocation = newLocation;
			newLocation.personArrive( this );
		}
		return this;
	}
	this.goBack = function(){
		var location = currentLocation;
		currentLocation.personLeave( this );
		previousLocation.personArrive( this );
		currentLocation = previousLocation;
		previousLocation = location;
		return this;
	}
	this.getLocation = function(){ return currentLocation; }
	this.birthDay = function(){ return new Date( (new Date()).getFullYear(), birthday.getMonth(), birthday.getDay() ); /*, currDay = new Date(); */ }

	this.getComplexion = function(getNumber){ // console.log('inperson-color',complexion,this.name);
		if(getNumber) return ("0x"+complexion)*1;
		else return "#"+complexion;
		if(complexion.substr(0,1)=="#") return complexion.substr(1); else return complexion;
	}
	this.getAge = function(){ return age||0; }
	this.growOlder = function(x){
		if(isAlive){
			age++;
			if(this.getAge() > (70+_r(11)+_r(10)+_r(9)+_r(8))) this.passAway();
		}
		return this;
	}
	this.addNickname = function( name ){ nicknames.push( name ); return this; }
	this.getNicknames = function( name ){ return nicknames.join( ", " ); }
	this.lastName = function(){ return nameParts[ nameParts.length - 1 ]; }
	this.greet = function( person, msg ){
		if(!person || person.constructor == Person){
			if(isAlive){
				if(typeof msg == 'function') msg = msg(person);
				alert("["+this.name+"]: "+ greetings[_r(greetings.length-1)] + (person?" "+person.getName(1):".") +"."+ (msg?" "+msg:"") );
			} else {
				alert("["+this.name+"]: Grrr... arg...");
			}
		}
		return this;
	}
	this.introduceSelf = function(){ if(isAlive) alert( (_r(3)%2==0?"My name is ":"I'm ") + this.name ); return this; }
	this.meet = function( stranger , location ){
		if(isAlive && stranger.constructor == Person) {
			if(!friendsID[ stranger.name ] && friendsID[ stranger.name ] != stranger.name){
				var greeting = pleasantries[_r(pleasantries.length-1)], extraMsg = stranger.isAlive()?'':".. I never met a dead person before.";
				if(!!greeting) greeting = ", " + greeting.toLowerCase();
				friendsList.push( stranger.name );
				friendsID[ stranger.name ] = stranger;
				alert("["+this.name+"]: Hi " + stranger.getName(1) + greeting + extraMsg);
				firstTimeMeetings[ stranger.name ] = new Date();
				stranger.meet(this);
			}
		}
		return this;
	}
	this.chillWith = function( people, location ){
		console.log(people);
		if(people.constructor != Array) people = [people];
		var person, subpeople, confuseMsg;
		for(var i in people){
			person = people[i];
			console.log(person);
			confuseMsg = person.isAlive() ? null : ' Wait... aren\'t you dead????';
			subpeople = people.slice(i+1);
			if(person.constructor == Person && person != this){
				console.log(person.name, this.knows(person) );
				if(!friendsID[person.name]) this.meet( person, location );
				else this.greet( person, confuseMsg );
				person.chillWith( subpeople );
			}
		}
	}
	this.finalWords = function(){
		var rand = _r(5),
			friends = friendsList.slice(0),
			lastFriend = (friends.length>1?friends.splice(-1):''),
			msg = "Farewell "+friends.join(", ")+(lastFriend?" and "+lastFriend:"")+". I will see you in the other world...";
		rand = _r(rand);
		if(rand % 3 == 0) msg = "Ughhhh...";
		alert("["+this.name+"]: "+msg);
		return this;
	}
	this.getFriendsCalled = function( namePart ){
		namePart = namePart.toLowerCase();
		var friends = [];
		for(var name in friendsID){
			console.log( 'hasfriend', name, friendsID[name], name.toLowerCase().indexOf( namePart ) );
			if( ~name.toLowerCase().indexOf( namePart ) ) friends.push( friendsID[name] );
			else if( ~friendsID[name].getNicknames().toLowerCase().indexOf( namePart ) ) friends.push( friendsID[name] );
		};
		return friends;
	}
	this.hasFriendsCalled = function( namePart ){ return !!this.getFriendsCalled( namePart ).length; }
	this.metWhen = function( person ){
		if( person.constructor == Person && friendsID[ person.name ] && firstTimeMeetings[ person.name ] ) return firstTimeMeetings[ person.name ];
		return null;
	}
	this.passAway = function(){
		if(isAlive){
			alert(this.name + " has passed away");
			isAlive = false;
			deathday = new Date();
			this.finalWords();
			this.body.style.backgroundColor = "gray";
			this.body.style.opacity = 0.5;
			System.Time.removeEvent( birthday.getMonth(), this.getName(), this, 'birthday' );
			this.haveFuneral();
		}
		return this;
	};
	this.haveFuneral = function(){
		if(!isAlive){
			_.forEach(friendsID,function(o){
				if( currentLocation ){
					o.goTo( currentLocation );
					setTimeout( function(){ o.goBack(); }, 3000 );
				}
			});
		}
		return this;
	}
	this.daysUntilBirthday = function(){ var currBDay = this.birthDay(), currDay = new Date(); return Math.round((currDay - currBDay)/(24*60*60*1000)); };

	this.hasSpouse = function(){ return !!this.spouse; }
	this.getMarriedTo = function( person ){
		if( person.constructor == Person && !this.hasSpouse() ){
			this.spouse = person;
			person.spouse = this;
		}
		return false;
	}
	this.getDivorced = function(){
		if(!!this.spouse){
			var self = this;
			setTimeout(function(){
					self.spouse.spouse = null;
					self.spouse = null;
				}, 10000
			);
			alert('What a shame... if only they could work it out...');
		} else alert(this.getName() + ' is not married!');
		return this;
	}

	if( gender == "F" ){
		this.makeChildWith = function( father, childData ){
			if( this.gender == "F" && !isPregnant && !(_r(77)%33==0) ){
				if( !childData ){
					childData = {
						gender: (_r(4)%2==1?"M":"F"),
						birthLocation: currentLocation || father.getLocation(),
						complexion: Math.floor(((this.getComplexion(1)+father.getComplexion(1))*0.5) + ((Math.round(Math.random())*2-1))*20 *Math.round(Math.random()*2)),
						mother: this,
						father: father
					}
					childData.name = _rv( System.firstNames(childData.gender !== "M") ) + ' ' + father.lastName();
				}

				isPregnant = true;
				pregnancyData = childData;
				pregnancyStage = 0;

				if(this.hasSpouse() && this.spouse != father) alert('Extramarital Affairs...');
				alert(this.getName() + ' got pregnant!');

			} else {
				if(isPregnant) alert(this.getName() + ' is already pregnant! Please wait at least '+(9-pregnancyStage)+' months to have more babies.');
				else alert('Failed making children. Please try again.');
			}
			return this;
		}
		this.isPregnant = function(){ return isPregnant; }
		this.pregnancyStage = function(){ return pregnancyStage; }
		this.pregnancyNextStage = function(){
			if(isPregnant){
				pregnancyStage++;
				var dueMonth = 8 + _r(2);
				if( pregnancyStage === dueMonth ) {
					var child = world.addPerson( pregnancyData );
					child.mother = this;
					child.father = pregnancyData.father;
					pregnancyData.father.addChild( child );
					/* mother */ children.push( child );

					isPregnant = false;
					pregnancyData = null;
					pregnancyStage = -1;

					alert( child.getName() + ' was born to ' + child.mother.getName() + ' and ' + child.father.getName() + '.' );
				}
				else if( pregnancyStage > dueMonth ){
					isPregnant = false;
					pregnancyData = null;
					pregnancyStage = -1;
					alert('There was a complication in '+this.getName()+'\'s pregnancy and it failed...');
				}
			}
			return pregnancyStage;
		}

	}
	this.addChild = function( person ){
		if( person.constructor == Person ) children.push( person );
		return this;
	}
	this.getChild = function( person ){
		if(person.constructor === Person)for(var s in children){ if( children[s] == person) return person; }
		if(typeof person === "string")for(var n in children){ if( children[s].name == person) return person; }
		return;
	}
	this.getChildren = function(){ return children; }
	this.hasChildren = function(){ return !!children.length; }
	this.siblings = function(){
		var fatherkids = this.father ? this.father.getChildren() : [],
			motherkids = this.mother ? this.mother.getChildren() : [];
		return _.union( fatherkids, motherkids );
	}

	this.body = makeHolder(this);
	systemID = System.generateID( this );

	(function(){
		Person.prototype.age = Person.prototype.age || 0;
		Person.prototype.toString = function(){ return [this.getName(),this.isMale()?'M':'F',this.getAge()+"yrs",/*this.weight+"lbs",*/this.isAlive()?'alive':'deceased',this['isPregnant']&&this.isPregnant()?this.pregnancyStage()+' months pregnant':''].join(' / '); }
	})();
}

export default {
	World,
	Location,
	Person,
}