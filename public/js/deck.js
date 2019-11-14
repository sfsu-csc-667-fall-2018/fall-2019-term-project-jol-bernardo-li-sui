class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

class Wild {
    constructor(wildCard) {
        this.wildCard = wildCard;
    }
}

class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck(colors, values, wildCards) {
        for(let color of colors) {
            for(let value of values) {
                this.deck.push(new Card(color, value));
            }
        }
        for(let wildCard of wildCards) {
            this.deck.push(new Wild(wildCard));
        }
        return this.deck;
    }

    shuffle() {
         let counter = this.deck.length, temp, i;

         while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
         }
         return this.deck;
    }

    deal() {
        let hand = [];
        while(hand.length < 7) {
            hand.push(this.deck.pop());
        }
        return hand;
    }

}

let colors = ['red', 'blue', 'green', 'yellow'];
let values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 
    'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse'];
let wildCards = ['Wild', 'Wild', 'Wild', 'Wild', 
    'Wild Draw Four', 'Wild Draw Four', 'Wild Draw Four', 'Wild Draw Four'];

let deck = new Deck();
deck.createDeck(colors, values, wildCards);
deck.shuffle();
console.log(deck.deal());