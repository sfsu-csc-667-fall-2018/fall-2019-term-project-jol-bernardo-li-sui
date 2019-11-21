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
            if(value === 'w' || value === 'w4') {
                deck.push(new Card('', value, "-wild"))
            } else {
                deck.push(new Card(color, value, ""));
            }
        }
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
     return deck;
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