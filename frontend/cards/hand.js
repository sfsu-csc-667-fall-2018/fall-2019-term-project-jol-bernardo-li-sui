const deck = require('./deck.js');

let deckInstance = [];
let hand = [];

let colors = ['--red', '--blue', '--green', '--yellow'];
let values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
    'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse', 'w', 'w', 'w', 'w',
    'w4', 'w4', 'w4', 'w4'];

deck.createDeck(deckInstance, colors, values);

deck.shuffle(deckInstance)

hand = deck.deal(deckInstance);

hand.map(card => {
    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)

    let handCardCircle = document.createElement('div')
    handCardCircle.classList.add(`hand__card--circle${card.circleColor}`)

    let handCardNum = document.createElement('p')
    handCardNum.classList.add('hand__card--num')

    let node = document.createTextNode(card.value)
    handCardNum.appendChild(node)
    handCardCircle.appendChild(handCardNum)
    handCard.appendChild(handCardCircle)

    let hand = document.querySelector('.hand');
    hand.appendChild(handCard)
})