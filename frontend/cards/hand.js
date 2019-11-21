const deck = require('./deck.js');

let deckInstance = [];
let hand = [];

let colors = ['--red', '--blue', '--green', '--yellow'];
let values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse'];

deck.createDeck(deckInstance, colors, values);

deck.shuffle(deckInstance)

deckInstance.map( card => {
    console.log(card)
})

hand = deck.deal(deckInstance);

hand.map(card => {
    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)

    let handCardCircle = document.createElement('div')
    handCardCircle.classList.add(`hand__card--circle${card.circleColor}`)


    if(card.value === "Reverse"){
        let handCardImg = document.createElement('img')
        handCardImg.classList.add("hand__card--img")
        handCardImg.src = `images/card_icons/reverse${card.color}.png`;

        handCardCircle.appendChild(handCardImg);
    } else{
        let handCardNum = document.createElement('p')
        handCardNum.classList.add('hand__card--num')

        let node = document.createTextNode(card.value)
        handCardNum.appendChild(node)

        handCardCircle.appendChild(handCardNum)
    }

    handCard.appendChild(handCardCircle)

    let hand = document.querySelector('.hand');
    hand.appendChild(handCard)
})