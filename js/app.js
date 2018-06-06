// Card list

const cardIcons = ['fa fa-diamond', 'fa fa-diamond',
					'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
					'fa fa-anchor', 'fa fa-anchor', 
					'fa fa-bolt', 'fa fa-bolt', 
					'fa fa-cube', 'fa fa-cube', 
					'fa fa-leaf', 'fa fa-leaf',
					'fa fa-bicycle', 'fa fa-bicycle',
					'fa fa-bomb', 'fa fa-bomb'];

const deck = document.querySelector('.deck');

function initGame() {
	shuffle(cardIcons);

	for (let i = 0; i < cardIcons.length; i++) {
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
		deck.appendChild(card);

		click(card);
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let matchCards = [];

/*
 * Click event
 */
	// TODO: use event.target for deck?
function click(card) {
	card.addEventListener('click', function() {
		// Add open and show classes + add to open array
		open(card);

		let firstCard = openCards[0];
		let secondCard = openCards[1];

		// Check for match
		isMatching(firstCard, secondCard);

		// TODO: Increment move counter
	})
}

/*
 * Open and show card
 */
function open(card) {
	card.classList.add('open', 'show', 'disable');
	openCards.push(card);
}

/*
 * Check for matches
 */
function isMatching(firstCard, secondCard) {
	if (openCards.length === 2) {
		if (firstCard.innerHTML === secondCard.innerHTML) {
		// If match: add match class + add to match array; remove from open array + remove open and show classes

			firstCard.classList.add('match');
			firstCard.classList.remove('open', 'show');

			secondCard.classList.add('match');
			secondCard.classList.remove('open', 'show');

			matchCards.push(firstCard, secondCard);

			openCards = [];

			// Check if game is over
			gameOver();

		} else {
		// Else, if no match: remove open and show classes, remove from open array
			setTimeout(function() {
				for (card of openCards) {
					card.classList.remove('open', 'show', 'disable');
				};
				openCards = [];
			}, 1000);
		}
	}
}

/*
 * Count moves
 */
function moveCount() {

}

/*
 * Check if game is over
 */
function gameOver() {
	const winner = document.getElementById('winner');
	setTimeout(function() {
		if (matchCards.length === cardIcons.length) {
			winner.style.display = 'block';
			// TODO: add moves, starScore, playTime values to msg
		};
	}, 750);
}

/*
 * Restart button
 */
 const restart = document.querySelector('.restart');
 restart.addEventListener('click', function() {
 	deck.innerHTML = "";

 	initGame();

 	matchCards = [];
 	openCards = [];
 })

///// START GAME
 initGame();
