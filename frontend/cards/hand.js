const deck = require('./deck.js')

let deckInstance = deck.createDeck()
let hand = []

deck.shuffle(deckInstance)

hand = deck.deal(deckInstance)

hand.map(card => {
    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)

    let handCardCircle = document.createElement('div')
    handCardCircle.classList.add(`hand__card--circle`)

    let handCardImg;

    switch(card.value){
        case 'Reverse': 
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/reverse${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break
        
        case 'Skip':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/skip${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'Draw Two':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img")
            handCardImg.src = `images/card_icons/draw2${card.color}.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'wild':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img-wild")
            handCardImg.src = `images/card_icons/wild.png`

            handCardCircle.appendChild(handCardImg)
            break

        case 'draw4':
            handCardImg = document.createElement('img')
            handCardImg.classList.add("hand__card--img-wild")
            handCardImg.src = `images/card_icons/draw4.png`

            handCardCircle.appendChild(handCardImg)
            break
        
        default: 
            let handCardNum = document.createElement('p')
            handCardNum.classList.add('hand__card--num')

            let node = document.createTextNode(card.value)
            handCardNum.appendChild(node)

            handCardCircle.appendChild(handCardNum)
    }

    handCard.appendChild(handCardCircle)

    let hand = document.querySelector('.hand')
    if(hand != null) hand.appendChild(handCard)
})