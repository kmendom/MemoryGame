//list with ALL CARDS

const icons = [
    { type: "fa fa-diamond", id: 0 },
    { type: "fa fa-diamond", id: 1 },
    { type: "fa fa-paper-plane-o", id: 2 },
    { type: "fa fa-paper-plane-o", id: 3 },
    { type: "fa fa-anchor", id: 4 },
    { type: "fa fa-anchor", id: 5 },
    { type: "fa fa-bolt", id: 6 },
    { type: "fa fa-bolt", id: 7 },
    { type: "fa fa-cube", id: 8 },
    { type: "fa fa-cube", id: 9 },
    { type: "fa fa-leaf", id: 10 },
    { type: "fa fa-leaf", id: 11 },
    { type: "fa fa-bicycle", id: 12 },
    { type: "fa fa-bicycle", id: 13 },
    { type: "fa fa-bomb", id: 14 },
    { type: "fa fa-bomb", id: 15 }
];

const game = document.querySelector(".deck");
const modal = document.querySelector(".bg-modal");
const movesContainer = document.querySelector(".moves");
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
const restartBtn = document.querySelector(".restart");
const timer = document.querySelector(".timer");
const close = document.querySelector(".close");


let openedCards = [];
let matchedCards = [];
let moves = 0;

//starting NEW GAME
function newGame() {
    shuffle(icons);
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i].type}"></i>`;
        card.id = icons[i].id;
        game.appendChild(card);
        //add click event to each card
        click(card);
    }
}


//starts GAME for the first time
newGame();

//CLICK on the card
function click(card) {


    // card click event
    card.addEventListener("click", function() {

        const currentCard = this;
        const previousCard = openedCards[0];

        //opened
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disabled");
            openedCards.push(this);

            //compare 2 opened cards
            compare(currentCard, previousCard);


        } else {
            //any opened cards
            currentCard.classList.add("open", "show");
            openedCards.push(this);
        }

    });
}



//comparing two cards for MATCH

function compare(currentCard, previousCard) {
    debugger;
    if (currentCard.innerHTML === previousCard.innerHTML && currentCard.id !== previousCard.id) {
        //matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //checking for GAME OVER
        gameOver();

    } else {

        setTimeout(function() {
                currentCard.classList.remove("open", "show", "disabled");
                previousCard.classList.remove("open", "show", "disabled");
                openedCards = [];
            },
            500);

        openedCards = [];
    }

    move();
};


//set up MOVES
movesContainer.innerHTML = 0;

function move() {
    moves++;
    movesContainer.innerHTML = moves;

    rating();
}

//set up RATING
starsContainer.innerHTML = star + star + star;

function rating() {
    if (moves < 15) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 29) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}

//RESTART button
restartBtn.addEventListener("click", function() {

    //deleting cards
    game.innerHTML = "";


    //creating new cards
    newGame();

    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = 0;

    starsContainer.innerHTML = star + star + star;

    //resets the timer
    totalSeconds = 0;


});

//setting up the TIMER
var interval = setInterval(countTimer, 1000);
let totalSeconds = 0;

//starts timer when page is loaded
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);

    if (minute < 10) {
        minute = "0" + minute;
    }
    if (seconds >= 60) {
        seconds = seconds % 60;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.querySelector(".timer").innerHTML = "Time : " + minute + ":" + seconds;

}

//stops timer
function stopTimer() {
    clearInterval(interval);
}

// game over + opening of the modal
function gameOver() {
    if (matchedCards.length === icons.length) {



        //print results into the pop up MODAL
        messageModal = document.querySelector(".content");
        messageModal.innerHTML = "<strong>CONGRATULATIONS!!!</strong> <br><br>" + timer.innerHTML +
            "<br> Moves : " + (Number.parseInt(movesContainer.textContent) + 1) + "<br> Rating :" +
            starsContainer.innerHTML;

        modal.style.display = "block";

        stopTimer();
    }

}

//closing modal
close.addEventListener("click", function() {
    modal.style.display = "none";


    game.innerHTML = "";

    //Call NEW GAME to create new cards

    newGame();

    //Reset ANY related variables

    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = 0;
    totalSeconds = 0;

    starsContainer.innerHTML = star + star + star;

    //reset the timer
    interval = setInterval(countTimer, 1000);
});

//SHUFFLE the cards
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
