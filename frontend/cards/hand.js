const deck = require('./deck.js');

let deckInstance = deck.createDeck();
let hand = [];

deck.shuffle(deckInstance)

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
    if(hand != null) hand.appendChild(handCard)
})