function parseGuess (guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert ("Oops, please enter a letter and a number on the board");
	} else {
		firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert ("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || 
			column < 0 || column >= model.boardSize) {
				alert ("Oops, that's off the board!");
			} else {
				return row + column;
			}
	}
	return null;
};
// Объект представления

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	dispalayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}

};

// Модель

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{locations: ["06", "16", "26"], hits: ["","",""]},
	{locations: ["24", "34", "44"], hits: ["","",""]},
	{locations: ["10", "11", "12"], hits: ["","",""]}],
	fire: function(guess){
		for (var i = 0; i < this.numShips; i++ ) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage ("HIT!");
				if (this.isSunk(ship)) {
					view.displayMessage ("You sunk my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.dispalayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !=="hit") {
				return false;
			}
		}
		return true;

		}
	};

	// Контроллер
	var controller = {
		guesses: 0,
		processGuess: function(guess) {
			var location = parseGuess(guess);
			if (location) {
				this.guesses++;
				var hit = model.fire(location);
				if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage ("You sank all my battleships, in " +
					this.guesses + " guesses");
				}
			}

		}
	};

	
// };


// view.displayMessage("fvjnkv");
// view.dispalayMiss("00");
// view.displayHit("56");
// view.displayHit("46");
// model.fire("03");
// model.fire("44");
// model.fire("34");
// model.fire("24");
// console.log(parseGuess("A0"));
// console.log(parseGuess("A"));
// console.log(parseGuess("B3"));
// console.log(parseGuess("C9"));
// console.log(parseGuess("a5"));
// controller.processGuess("B1");
// controller.processGuess("A0");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("G7");