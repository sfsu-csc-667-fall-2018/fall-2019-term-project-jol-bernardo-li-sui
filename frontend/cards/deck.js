class Card {
    constructor(color, value, circleColor) {
        this.color = color;
        this.value = value;
        this.circleColor = circleColor;
    }
}

class Wild {
    constructor(wild){
        this.wild = wild
    }
}

const createDeck = (deck, colors, values) => {
    for(let color of colors) {
        for(let value of values) {
            deck.push(new Card(color, value, ""));
        }
    }

    let wildDeck = ['w', 'w', 'w', 'w', 'w4', 'w4', 'w4', 'w4']

    for(let wild of wildDeck){
        deck.push(new Card("", wild, "-wild"))
    }
}

const shuffle = (deck) => {
     let counter = deck.length, temp, i;

     while(counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
     }
}

const deal = (deck) => {
    let hand = [];
    while(hand.length < 7) {
        hand.push(deck.pop());
    }
    return hand;
}

module.exports = {
    createDeck,
    shuffle,
    deal
}