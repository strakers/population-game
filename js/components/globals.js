
/*
===================================================================================================================================================
	SYSTEM | Global object representing the logic of the universe. Stores utility functions
===================================================================================================================================================
*/

var System = {
	
	generateID : function( person ){
		var id = Math.floor(Math.random() * 1e16).toString(36), 
			prefix1 = person.name.split(' ').map(function(o){ return o.substr(0,1).toLowerCase(); }).join(''),
			prefix2 = person.gender.toLowerCase();
			prefix3 = person.birthDay()*1;
		return prefix1 + prefix2 + prefix3 + id;
	},
	
	makeSlug: function( str ){
		return str
			.toLowerCase()
			.replace(/[^\w ]+/g,'')
			.replace(/ +/g,'-')
        ;
	},
	
	firstNames: function( s ){
		s=s%2;
		names = [
			/* boy names */
			'Abdallah|Abdel-Rahman|Abi|Abinet|Abiue|Abiye|Abraham|Adrián|Agustín|Ahmed|Aiden|Ajani|Alejandro|Alexander|Alexis|Ali|Amanual|Andrés Felipe|Angel|Anthony|Araya|Armaan|Arnav|Arthur|Aryan|Asfaw|Benjamin|Bereket|Berhane|Berhanu|Beshoi|Bilal|Biniam|Biruk|Brandon|Bruno|Carlos|Carter|Charles|Christian|Christopher|Cristóbal|Daniel|Daniel Alejandro|Davi|David|Dawit|Derege|Deven|Diego|Diego Alejandro|Dylan|Elias|Elijah|Emiliano|Enzo|Ephrem|Eric|Ermias|Ethan|Eyobel|Ezra|Fadi|Fasil|Felipe|Félix|Francisco|Gabriel|Gebre|George|Guilherme|Habib|Haile|Halim|Hamza|Hanok|Hassan|Hewan|Hudson|Hunter|Hussein|Ian|Ibrahim|Iker|Ishaan|Jack|Jackson|Jacob|Jaden|James|Jason|Jayden|Jeremiah|Jerónimo|Jesús|Joaquín|John|Johnathan|José|Joseph|Joshua|Juan|Juan Andrés|Juan David|Juan José|Justin|Karim|Keven|Kevin|Khaled|Kidus|Kirollos|Kirubel|Lautaro|Leonardo|Liam|Logan|Lucas|Luis|Lukas|Mahmoud|Mark|Martín|Mason|Mateo|Matheus|Mathew|Mathios|Matías|Matthew|Maximiliano|Melak|Michael|Miguel|Mikael|Mikiyas|Mina|Mohamed|Moshe|Murad|Mustafa|Nahum|Nathan|Neil|Nicolás|Nikhil|Noah|Olivier|Omar|Owen|Pedro|Peter|Pierre|Rafael|Raphaël|Richard|Robel|Robert|Rodrigo|Rohan|Ryan|Sammy|Samuel|Santiago|Santino|Sebastián|Selam|Selim|Shewit|Simon|Solomon|Suraj|Tadesse|Taha|Tamiru|Tamrat|Tareq|Teddy|Teodros|Thiago|Thomas|Tomás|Tyler|Vicente|William|Yared|Yassin|Yohnathan|Yonas|Yordanos|Youssef|Yusef|Zecharias'.split('|'),
			/* girl names */
			'Abeba|Abigail|Abril|Aditi|Agustina|Alem|Alexandra|Alice|Alma|Almaz|Alondra|Alysha|Amanda|Amelia|Ana Paula|Andrea|Angela|Angelina|Anges|Anjali|Anna|Antonella|Anya|Ariana|Arushi|Ashley|Ashraqat|Ava|Avery|Aya|Azeb|Barbara|Beatriz|Bethlehem|Brianna|Brooklyn|Camila|Camille|Catalina|Chana|Chaya|Chloe|Choe|Dalal|Daniela|Desta|Diya|Doha|Dorothy|Eden|Ekatarina|Eleni Nivi|Elisabeth|Elizabeth|Ella|Ellen|Elsa|Emelia|Emely|Emilia|Emilie|Emily|Emina|Emma|Esther|Fajr|Farah|Farida|Fatima|Fatimah|Fatin|Fatma|Fernanda|Feven|Fiona|Florence|Florencia|Gabriela|Gabrielle|Gamalat|Gamila|Giovanna|Grace|Haben|Heaven|Habiba|Haley|Hana|Hannah|Hasnaa|Helen|Hosna|Hosniya|Irene|Isabella|Isabelle|Isidora|Jada|Jasmine|Jennifer|Jimena|Julia|Julia, Julieta|Julie|Juliette|Kamila|Kavya|Kayla|Kedist|Khloe|Lara|Laura|Lea|Léa|Leah|Leyla|Lili|Lily|Lina|Linda|London|Lucía|Luciana|Luiza|Luwam|Luz|Lydia|Madison|Maha|Mahlet|Maite|Makayla|Malak|Manna|Menna|Manuela|Margaret|Maria|María|Maria Eduarda|María José|Mariam|Mariana|Marie|Marina|Marone|Marta|Martina|Marwa|Mary|Maya|Messeret|Mia|Mía|Micaela|Milagros|Mya|Nada|Nevaeh|Nicole|Nisha, Nishi|Noor|Olivia|Patricia|Rachel|Rahel|Rahiel|Rahwa|Reem|Regina|Renata|Riya|Romina|Rosalie|Rowan|Ruby|Ruhi|Ruth|Ruthie|Saba|Sahar|Salma|Salomé|Samantha|Samrawit|Sara|Sarah|Senait|Seren|Shahd|Shaimaa|Shewit|Shreya|Sofia|Sofía|Sophia|Sophie|Sophie |Suha|Susan|Taylor|Tianna|Tigist|Tizita|Tsega|Tsege|Valentina|Valeria|Victoria|Ximena|Yeshi|Yohana|Zewdy|Zoe|Zoé'.split('|'),
			/* sur names */
			'Smith|Johnson|Williams|Jones|Brown|Davis|Miller|Wilson|Moore|Taylor|Anderson|Thomas|Jackson|White|Harris|Martin|Thompson|Garcia|Martinez|Robinson|Clark|Rodriguez|Lewis|Lee|Walker|Hall|Allen|Young|Hernandez|King|Wright|Lopez|Hill|Scott|Green|Adams|Baker|Gonzalez|Nelson|Carter|Mitchell|Perez|Roberts|Turner|Phillips|Campbell|Parker|Evans|Edwards|Collins|Stewart|Sanchez|Morris|Rogers|Reed|Cook|Morgan|Bell|Murphy|Bailey|Rivera|Cooper|Richardson|Cox|Howard|Ward|Torres|Peterson|Gray|Ramirez|James|Watson|Brooks|Kelly|Sanders|Price|Bennett|Wood|Barnes|Ross|Henderson|Coleman|Jenkins|Perry|Powell|Long|Patterson|Hughes|Flores|Washington|Butler|Simmons|Foster|Gonzales|Bryant|Alexander|Russell|Griffin|Diaz|Hayes|Myers|Ford|Hamilton|Graham|Sullivan|Wallace|Woods|Cole|West|Jordan|Owens|Reynolds|Fisher|Ellis|Harrison|Gibson|Mcdonald|Cruz|Marshall|Ortiz|Gomez|Murray|Freeman|Wells|Webb|Simpson|Stevens|Tucker|Porter|Hunter|Hicks|Crawford|Henry|Boyd|Mason|Morales|Kennedy|Warren|Dixon|Ramos|Reyes|Burns|Gordon|Shaw|Holmes|Rice|Robertson|Hunt|Black|Daniels|Palmer|Mills|Nichols|Grant|Knight|Ferguson|Rose|Stone|Hawkins|Dunn|Perkins|Hudson|Spencer|Gardner|Stephens|Payne|Pierce|Berry|Matthews|Arnold|Wagner|Willis|Ray|Watkins|Olson|Carroll|Duncan|Snyder|Hart|Cunningham|Bradley|Lane|Andrews|Ruiz|Harper|Fox|Riley|Armstrong|Carpenter|Weaver|Greene|Lawrence|Elliott|Chavez|Sims|Austin|Peters|Kelley|Franklin|Lawson|Fields|Gutierrez|Ryan|Schmidt|Carr|Vasquez|Castillo|Wheeler|Chapman|Oliver|Montgomery|Richards|Williamson|Johnston|Banks|Meyer|Bishop|Mccoy|Howell|Alvarez|Morrison|Hansen|Fernandez|Garza|Harvey|Little|Burton|Stanley|Nguyen|George|Jacobs|Reid|Kim|Fuller|Lynch|Dean|Gilbert|Garrett|Romero|Welch|Larson|Frazier|Burke|Hanson|Day|Mendoza|Moreno|Bowman|Medina|Fowler|Brewer|Hoffman|Carlson|Silva|Pearson|Holland|Douglas|Fleming|Jensen|Vargas|Byrd|Davidson|Hopkins|May|Terry|Herrera|Wade|Soto|Walters|Curtis|Neal|Caldwell|Lowe|Jennings|Barnett|Graves|Jimenez|Horton|Shelton|Barrett|Obrien|Castro|Sutton|Gregory|Mckinney|Lucas|Miles|Craig|Rodriquez|Chambers|Holt|Lambert|Fletcher|Watts|Bates|Hale|Rhodes|Pena|Beck|Newman|Haynes|Mcdaniel|Mendez|Bush|Vaughn|Parks|Dawson|Santiago|Norris|Hardy|Love|Steele|Curry|Powers|Schultz|Barker|Guzman|Page|Munoz|Ball|Keller|Chandler|Weber|Leonard|Walsh|Lyons|Ramsey|Wolfe|Schneider|Mullins|Benson|Sharp|Bowen|Daniel|Barber|Cummings|Hines|Baldwin|Griffith|Valdez|Hubbard|Salazar|Reeves|Warner|Stevenson|Burgess|Santos|Tate|Cross|Garner|Mann|Mack|Moss|Thornton|Dennis|Mcgee|Farmer|Delgado|Aguilar|Vega|Glover|Manning|Cohen|Harmon|Rodgers|Robbins|Newton|Todd|Blair|Higgins|Ingram|Reese|Cannon|Strickland|Townsend|Potter|Goodwin|Walton|Rowe|Hampton|Ortega|Patton|Swanson|Joseph|Francis|Goodman|Maldonado|Yates|Becker|Erickson|Hodges|Rios|Conner|Adkins|Webster|Norman|Malone|Hammond|Flowers|Cobb|Moody|Quinn|Blake|Maxwell|Pope|Floyd|Osborne|Paul|Mccarthy|Guerrero|Lindsey|Estrada|Sandoval|Gibbs|Tyler|Gross|Fitzgerald|Stokes|Doyle|Sherman|Saunders|Wise|Colon|Gill|Alvarado|Greer|Padilla|Simon|Waters|Nunez|Ballard|Schwartz|Mcbride|Houston|Christensen|Klein|Pratt|Briggs|Parsons|Mclaughlin|Zimmerman|French|Buchanan|Moran|Copeland|Roy|Pittman|Brady|Mccormick|Holloway|Brock|Poole|Frank|Logan|Owen|Bass|Marsh|Drake|Wong|Jefferson|Park|Morton|Abbott|Sparks|Patrick|Norton|Huff|Clayton|Massey|Lloyd|Figueroa|Carson|Bowers|Roberson|Barton|Tran|Lamb|Harrington|Casey|Boone|Cortez|Clarke|Mathis|Singleton|Wilkins|Cain|Bryan|Underwood|Hogan|Mckenzie|Collier|Luna|Phelps|Mcguire|Allison|Bridges|Wilkerson|Nash|Summers|Atkins|Wilcox|Pitts|Conley|Marquez|Burnett|Richard|Cochran|Chase|Davenport|Hood|Gates|Clay|Ayala|Sawyer|Roman|Vazquez|Dickerson|Hodge|Acosta|Flynn|Espinoza|Nicholson|Monroe|Wolf|Morrow|Kirk|Randall|Anthony|Whitaker|Oconnor|Skinner|Ware|Molina|Kirby|Huffman|Bradford|Charles|Gilmore|Dominguez|Oneal|Bruce|Lang|Combs|Kramer|Heath|Hancock|Gallagher|Gaines|Shaffer|Short|Wiggins|Mathews|Mcclain|Fischer|Wall|Small|Melton|Hensley|Bond|Dyer|Cameron|Grimes|Contreras|Christian|Wyatt|Baxter|Snow|Mosley|Shepherd|Larsen|Hoover|Beasley|Glenn|Petersen|Whitehead|Meyers|Keith|Garrison|Vincent|Shields|Horn|Savage|Olsen|Schroeder|Hartman|Woodard|Mueller|Kemp|Deleon|Booth|Patel|Calhoun|Wiley|Eaton|Cline|Navarro|Harrell|Lester|Humphrey|Parrish|Duran|Hutchinson|Hess|Dorsey|Bullock|Robles|Beard|Dalton|Avila|Vance|Rich|Blackwell|York|Johns|Blankenship|Trevino|Salinas|Campos|Pruitt|Moses|Callahan|Golden|Montoya|Hardin|Guerra|Mcdowell|Carey|Stafford|Gallegos|Henson|Wilkinson|Booker|Merritt|Miranda|Atkinson|Orr|Decker|Hobbs|Preston|Tanner|Knox|Pacheco|Stephenson|Glass|Rojas|Serrano|Marks|Hickman|English|Sweeney|Strong|Prince|Mcclure|Conway|Walter|Roth|Maynard|Farrell|Lowery|Hurst|Nixon|Weiss|Trujillo|Ellison|Sloan|Juarez|Winters|Mclean|Randolph|Leon|Boyer|Villarreal|Mccall|Gentry|Carrillo|Kent|Ayers|Lara|Shannon|Sexton|Pace|Hull|Leblanc|Browning|Velasquez|Leach|Chang|House|Sellers|Herring|Noble|Foley|Bartlett|Mercado|Landry|Durham|Walls|Barr|Mckee|Bauer|Rivers|Everett|Bradshaw|Pugh|Velez|Rush|Estes|Dodson|Morse|Sheppard|Weeks|Camacho|Bean|Barron|Livingston|Middleton|Spears|Branch|Blevins|Chen|Kerr|Mcconnell|Hatfield|Harding|Ashley|Solis|Herman|Frost|Giles|Blackburn|William|Pennington|Woodward|Finley|Mcintosh|Koch|Best|Solomon|Mccullough|Dudley|Nolan|Blanchard|Rivas|Brennan|Mejia|Kane|Benton|Joyce|Buckley|Haley|Valentine|Maddox|Russo|Mcknight|Buck|Moon|Mcmillan|Crosby|Berg|Dotson|Mays|Roach|Church|Chan|Richmond|Meadows|Faulkner|Oneill|Knapp|Kline|Barry|Ochoa|Jacobson|Gay|Avery|Hendricks|Horne|Shepard|Hebert|Cherry|Cardenas|Mcintyre|Whitney|Waller|Holman|Donaldson|Cantu|Terrell|Morin|Gillespie|Fuentes|Tillman|Sanford|Bentley|Peck|Key|Salas|Rollins|Gamble|Dickson|Battle|Santana|Cabrera|Cervantes|Howe|Hinton|Hurley|Spence|Zamora|Yang|Mcneil|Suarez|Case|Petty|Gould|Mcfarland|Sampson|Carver|Bray|Rosario|Macdonald|Stout|Hester|Melendez|Dillon|Farley|Hopper|Galloway|Potts|Bernard|Joyner|Stein|Aguirre|Osborn|Mercer|Bender|Franco|Rowland|Sykes|Benjamin|Travis|Pickett|Crane|Sears|Mayo|Dunlap|Hayden|Wilder|Mckay|Coffey|Mccarty|Ewing|Cooley|Vaughan|Bonner|Cotton|Holder|Stark|Ferrell|Cantrell|Fulton|Lynn|Lott|Calderon|Rosa|Pollard|Hooper|Burch|Mullen|Fry|Riddle|Levy|David|Duke|Odonnell|Guy|Michael|Britt|Frederick|Daugherty|Berger|Dillard|Alston|Jarvis|Frye|Riggs|Chaney|Odom|Duffy|Fitzpatrick|Valenzuela|Merrill|Mayer|Alford|Mcpherson|Acevedo|Donovan|Barrera|Albert|Cote|Reilly|Compton|Raymond|Mooney|Mcgowan|Craft|Cleveland|Clemons|Wynn|Nielsen|Baird|Stanton|Snider|Rosales|Bright|Witt|Stuart|Hays|Holden|Rutledge|Kinney|Clements|Castaneda|Slater|Hahn|Emerson|Conrad|Burks|Delaney|Pate|Lancaster|Sweet|Justice|Tyson|Sharpe|Whitfield|Talley|Macias|Irwin|Burris|Ratliff|Mccray|Madden|Kaufman|Beach|Goff|Cash|Bolton|Mcfadden|Levine|Good|Byers|Kirkland|Kidd|Workman|Carney|Dale|Mcleod|Holcomb|England|Finch|Head|Burt|Hendrix|Sosa|Haney|Franks|Sargent|Nieves|Downs|Rasmussen|Bird|Hewitt|Lindsay|Le|Foreman|Valencia|Oneil|Delacruz|Vinson|Dejesus|Hyde|Forbes|Gilliam|Guthrie|Wooten|Huber|Barlow|Boyle|Mcmahon|Buckner|Rocha|Puckett|Langley|Knowles|Cooke|Velazquez|Whitley|Noel|Vang'.split('|')
		];
		return names[s];
	},
	Time : new (function(int){
		
		var interval = int, month = 0, year = 0, months = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'.split('|'), timer, events;
		
		events = {
			0 : [],
			1 : [],
			2 : [],
			3 : [],
			4 : [],
			5 : [],
			6 : [],
			7 : [],
			8 : [],
			9 : [],
			10 : [],
			11 : []
		}
		
		this.nextMonth = function(){ 
			++month; 
			if(month === 12){ ++year; month = 0; } 
			
			//affect of time on people
			_.mapValues(world.personDatabase(), function(p,i){
				// age increment -- if(month===p.birthDay().getMonth()){ p.growOlder(); console.log( 'Happy Birthday '+p.getName()+'!' ); }
				// pregnancy increment
				if(p['isPregnant']&&p.isPregnant())p.pregnancyNextStage();
				// month listener fn increment call
				
			}); 
			var schedule = events[month], i = 0, e = null;
			for(i=0,e=null;i<schedule.length;++i){
				e = schedule[i];
				if(typeof e.data !== 'object') e.data = {};
				
				switch(e.type){
					case 'birthday' : 
						e.target.growOlder();
						console.log( 'Happy Birthday '+e.target.getName()+'!' );
					break;
					
					case 'pregnancy' : 
						if(e.target['isPregnant']&&e.target.isPregnant())e.target.pregnancyNextStage();
						e.data['months'] = e.target.pregnancyStage();
					break;
					
					case 'anniversary' : 
						if(e.data['spouse']) console.log( 'Happy Anniversary to '+e.target.getName()+' and '+e.data.spouse.getName()+'!' );
					break;
					
					case 'income' : 
						if(e.data['amount']){ 
							console.log( e.target.getName()+' received $'+e.data.amount.toFixed(2)+'!' ); 
							// e.target.getMoney( e.data.amount );
						}
					break;
					
					case 'expense' : 
						if(e.data['amount']){ 
							console.log( e.target.getName()+' spent $'+e.data.amount.toFixed(2)+( e.data['expense'] ? ' on '+ e.data['expense']: '' )+'!' ); 
							// e.target.spendMoney( e.data.amount, e.data['expense'] );
						}
					break;
					
					case 'funeral' : 
						// same month as pass away
						// gather friends (on random 4:5) to goTo 
					break;
				}
				if(typeof e.persist === 'number') e.persist--;
			}
			console.log("-------------------------------\n",(2013+year)+'-'+month,'{ year : '+year+' , month : '+month+' }')
			events[month] = _.filter(schedule,'persist'); // remove non-persistant or expired events
			return this; 
		}
		
		this.getSchedule = function(n){ if(n&&n<12) return events[n]; else return events; }
		this.registerEvent = function( month, slug, persist, target, eventType, eventData ){
			if(typeof month === 'number' && month < 12){
				events[month].push({ active: true, slug: slug, persist: persist, target: target, type: eventType, data: eventData||{} });
			}
			return this;
		}
		this.removeEvent = function( month, slug, target, eventType, eventData ){
			
			var query = {};
			if(typeof month !== 'number' || month < 0) return;
			if(typeof slug === 'string') query.slug = slug;
			if(target && typeof target === 'object') query.target = target;
			if(typeof eventType === 'string') query.type = eventType;
			if(eventData && typeof eventData === 'object') query.data = eventData;
			
			_.remove(events[month],query);
			
			return this;
		}
		
		this.prevMonth = function(){ month--; if(month < 0){ year--; month = 11; } return this; }		
		this.nextYear = function(){ year++; return this; }
		this.prevMonth = function(){ year--; return this; }
		
		this.getMonth = function(){ return month; }		
		this.getMonthName = function(){ return months[month]; }
		this.getYear = function(){ return year; }		
		this.getDate = function(){ return new Date( year+2013, month, 1 ); }
		
		this.startTimer = function(delay){ delay = delay || interval || 10000; timer = setInterval( this.nextMonth, delay ); return this; }
		this.stopTimer = function(){ clearInterval( timer ); return this; }
		this.getTimer = function(){ return timer; }
		
		this.startTimer();
		
	})(20000)
}


/*
===================================================================================================================================================
	MAKEHOLDER | Global function to create a visual representation of a person
===================================================================================================================================================
*/

function makeHolder( person ){
	if( person.constructor == Person ){
		var div = document.createElement("div");
		document.getElementById('people').appendChild( div );
		
		div.className = "person " + (person.isMale() ? "M" : "F"); 
		
		/*
		div.style.borderWidth = 1 + "px";
		div.style.borderColor = "black";
		div.style.borderStyle = "solid";
		div.style.borderColor = person.isMale() ? "blue" : "red";
		div.style.borderWidth = Math.floor(Math.random() * 2) + 1 + "px";
		div.style.borderStyle = Math.floor(Math.random() * 5) % 2 == 0 ? "dotted" : "solid";
		div.style.width = person.
		div.style.height = person.getAge() + 20 + "px";
		div.style.padding = 10; 
		*/
		
		div.style.float = "left";
		div.style.backgroundColor = person.getComplexion();
		div.setAttribute('data-name',person.name);
		div.setAttribute('draggable',true);
		div.ondragstart = function(e){
			e.dataTransfer.setData("person",e.target.getAttribute('data-name'));
			console.log('dragstart',e.target.getAttribute('data-name'));
		}
		div.ondragover = function(e){
			e.preventDefault();
			//console.log('dragover',e);
		}
		div.ondrop = function(e){
			e.preventDefault();
			var name = e.dataTransfer.getData("person"), 
				person = world.getPerson(name), 
				dragTarget = person.body,
				dropTarget = e.target,
				child;
			if(dragTarget.essence.isMale() && !dropTarget.essence.isMale()){
				alert( dragTarget.essence.getName() + ' had relations with ' + dropTarget.essence.getName() + '... ;)' );
				dropTarget.essence.makeChildWith( dragTarget.essence );
			}
		}
		//div.innerHTML = person.name;
		div.onclick = function(){ alert( person.toString() ); if( div.essence.name === 'Rob Ford' ) alert ('Drunken stupor...'); };
		div.essence = person;
		
		if( div.essence.getLocation() ){
			flag = document.createElement("div");
			flag.className = 'flag '+ ( div.essence.getLocation().name == 'United States of America' ? 'usa' : div.essence.getLocation().name.toLowerCase() );
			div.innerHTML = '';
			div.appendChild(flag);
		}
		
		return div;
	}
}


/*
===================================================================================================================================================
	COUNTRIES | Global array of locations. Populate world using world.divideAndConquer( ... )
===================================================================================================================================================
*/

var countries = [
	{ 
		name: "Canada" , 
		children: [
			{
				name: "Ontario",				
				children: [
					{
						name: "Toronto"
					},
					{
						name: "Windsor"
					},
					{
						name: "Sudbury"
					},
					{
						name: "Ottawa"
					}
				]
			},
			{
				name: "Quebec",				
				children: [
					{
						name: "Montreal"
					},
					{
						name: "Quebec City"
					}
				]
			},
			{
				name: "Alberta",				
				children: [
					{
						name: "Calgary"
					}
				]
			}
		]
	},
	{ 
		name: "United States of America" , 
		children: [
			{
				name: "New York",				
				children: [
					{
						name: "Buffulo"
					},
					{
						name: "New York City"
					},
					{
						name: "Rochester"
					}
				]
			},
			{
				name: "Pennsylvania",				
				children: [
					{
						name: "Philidelphia"
					}
				]
			},
			{
				name: "New Jersey",				
				children: [
					{
						name: "Newark"
					}
				]
			}
		]
	}
]