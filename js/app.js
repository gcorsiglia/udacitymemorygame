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
 * Initialize game
 */
const deck = document.querySelector('.deck');
let openCards = [];
let matchCards = [];

function initGame() {
	shuffle(cardIcons);

	for (let i = 0; i < cardIcons.length; i++) {
		const card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
		deck.appendChild(card);

		clickCard(card);
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
 * Click event
 */
	// TODO: use event.target for deck?
function clickCard(card) {
	card.addEventListener('click', function() {
		// Show card
		if (openCards.length <= 1) {
			open(card);
		}
		
		let firstCard = openCards[0];
		let secondCard = openCards[1];

		// Check for match
		isMatching(firstCard, secondCard);
	})
}

/*
 * Open and show card
 */
function open(card) {
	// Add to open array + open and show classes to card
	openCards.push(card);
	card.classList.add('open', 'show', 'disable');
}

/*
 * Check for matches
 */
function isMatching(firstCard, secondCard) {
	if (openCards.length === 2) {
		if (firstCard.innerHTML === secondCard.innerHTML) {
		// If match: add match class and remove open and show classes + add cards to match array

			firstCard.classList.add('match');
			firstCard.classList.remove('open', 'show');

			secondCard.classList.add('match');
			secondCard.classList.remove('open', 'show');

			matchCards.push(firstCard, secondCard);

			// Empty open array
			openCards = [];

			// Check if game is over
			gameOver();

		} else {
		// Else, if no match: remove open and show classes + empty open array
			setTimeout(function() {
				for (card of openCards) {
					card.classList.remove('open', 'show', 'disable');
				};
				openCards = [];
			}, 1000);
		}

		// Increment move counter
		moveCount();
	}
}

/*
 * Count moves
 */
const moveDisplay = document.querySelector('.moves');
let moves = 0;

function moveCount() {
	moves++;
	moveDisplay.innerText = moves;
}

/*
 * Star rating
 */
let stars = 3;



/*
 * Timer
 */
function timer () {

}

/*
 * Check if game is over
 */
const winner = document.getElementById('winner');

function gameOver() {
	const totalMoves = document.getElementById('moves');
	const starScore = document.getElementById('starScore');
	const playTime = document.getElementById('playTime');

	setTimeout(function() {
		if (matchCards.length === cardIcons.length) {
			winner.style.display = 'block';
			
			totalMoves.innerText = moves;
			starScore.innerText = stars;
			playTime.innerText = time;
		};
	}, 750);
}

/*
 * Play again button
 */
const playAgain = document.querySelector('#playAgain');

playAgain.addEventListener('click', function() {
	winner.style.display = 'none';
	restartGame(); 
})

/*
 * Restart game
 */
const restart = document.querySelector('.restart');

function restartGame() {
	deck.innerHTML = "";
	
	moves = 0;
	moveDisplay.innerText = 0;

	initGame();

	matchCards = [];
	openCards = [];
}

restart.addEventListener('click', function() {
	restartGame(); 
})

///////// START GAME
initGame();
