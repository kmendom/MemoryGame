//list with ALL CARDS

const icons = ["fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor", "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
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
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
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

    if (currentCard.innerHTML === previousCard.innerHTML) {
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
    if (moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 15) {
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
    clearInterval(timer);
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
