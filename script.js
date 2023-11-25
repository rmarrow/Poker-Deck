class Card {
    constructor(cardId, value) {
        this.card = cardId;
        this.value = value;
    }

    // re-structure the card format to extend every card individually.
    createCardElement() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.textContent = this.value;
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = 'Poker Cards';
        cardContent.appendChild(cardFront);
        cardContent.appendChild(cardBack);
        cardElement.appendChild(cardContent);
        return cardElement;
    }
}

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cards = [];
for (const suit of suits) {
    for (const value of values) {
        const card = new Card(cards.length, `${value} of ${suit}`);
        cards.push(card);
    }
}

const container = document.getElementById('cardContainer');
let isStacked = true;

// Function to stack the cards on top of each other
function stackCards() {
    container.innerHTML = '';
    const cardStack = document.createElement('div');
    cardStack.classList.add('card-stack');
    for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        const cardElement = card.createCardElement();
        cardElement.style.transform = `translateY(-${i}px)`;
        cardStack.appendChild(cardElement);
    }
    container.appendChild(cardStack);
    isStacked = true;
}

// Function to separate the cards into 7 cards for each player
function separateCards() {
    if (!isStacked) {
        return;
    }
    // row 64, 65, 70 added 3 and 0
    const cardStack = document.querySelector('.card-stack');
    const cardElements = cardStack.querySelectorAll('.card');
    const numPlayers = 7;
    const numCardsPerPlayer = Math.floor(cards.length / numPlayers);
    let playerIndex = 3;
    let cardIndex = 3;
    for (const cardElement of cardElements) {
        cardElement.style.transform = `translateX(${playerIndex * 150}px) translateY(${cardIndex * 30}px)`;
        playerIndex++;
        if (playerIndex >= numPlayers) {
            playerIndex = 2;
            cardIndex++;
        }
        if (cardIndex >= numCardsPerPlayer && playerIndex === 0) {
            break;
        }
    }
    isStacked = false;
}

// Stack the cards on page load [[[side note(added in values)]]]
stackCards(values);

// Add click event listener to container to separate the cards
container.addEventListener('click', separateCards);


    // added in canvas matrix effects
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    // Set the canvas size to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get the canvas context (added 3d)
    const ctx = canvas.getContext('3d');

    // Set the pixel size and color
    const pixelSize = 10;
    const pixelColor = '#0F0';

    // Create an array of pixel objects
    const pixels = [];
    for (let x = 0; x < canvas.width; x += pixelSize) {
    for (let y = 0; y < canvas.height; y += pixelSize) {
    pixels.push({
    x,
    y,
    value: Math.floor(Math.random() * 2),
});
}
}

    // Draw the pixels on the canvas
    function drawPixels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = pixelColor;
    pixels.forEach((pixel) => {
    if (pixel.value === 1) {
    ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
}
});
}

    // Update the pixel values and redraw them
    function updatePixels() {
    pixels.forEach((pixel) => {
        pixel.value = Math.floor(Math.random() * 2);
    });
    drawPixels();
}

    // Set the update interval
    setInterval(updatePixels, 50);