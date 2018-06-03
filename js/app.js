// Card list

const cardIcons = ['fa fa-diamond', 'fa fa-diamond', 
					'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 
					'fa fa-anchor', 'fa fa-anchor', 
					'fa fa-bolt', 'fa fa-bolt', 
					'fa fa-cube', 'fa fa-cube', 
					'fa fa-leaf', 'fa fa-leaf', 
					'fa fa-bicycle', 'fa fa-bicycle', 
					'fa fa-bomb', 'fa fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle cards
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 const deck = document.querySelector('.deck');

 for (let i = 0; i < cardIcons.length; i++) {
 	shuffle(cardIcons);
 	const card = document.createElement('li');
 	card.classList.add('card');
 	card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
 	deck.appendChild(card);
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

const allCards = document.querySelectorAll('.card');

let openCards = [];
let matchCards = [];

// Click event
allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		// Add open and show classes + add to open array

		card.classList.add('open', 'show');
		openCards.push(card);

		// Check for match
		if (openCards.length === 2) {
			let firstCard = openCards[0];
			let secondCard = openCards[1];
			
			if (firstCard.innerHTML === secondCard.innerHTML) {
			// If match: add match class + add to match array; remove from open array + remove open and show classes

				firstCard.classList.add('match');
				firstCard.classList.remove('open');
				firstCard.classList.remove('show');

				secondCard.classList.add('match');
				secondCard.classList.remove('open');
				secondCard.classList.remove('show');

				matchCards.push(firstCard);
				matchCards.push(secondCard);

				openCards = [];

			} else {
			// Else, if no match: remove open and show classes, remove from open array
				// TODO: add time delay

				firstCard.classList.remove('open');
				firstCard.classList.remove('show');

				secondCard.classList.remove('open');
				secondCard.classList.remove('show');

				openCards = [];
			}
		}
	})
})






