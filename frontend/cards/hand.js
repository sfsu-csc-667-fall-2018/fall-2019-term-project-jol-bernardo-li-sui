import axios from 'axios'

let getHand = (id, callback) => {
    axios.get(`/drawHand/${id}`).then(hand => {
        renderHand(hand)
    }).then(_ => {
        callback(id)
    })
}

let renderHand = (hand) => {
    hand.data.map(card => {
        renderCard(card)
    })
}

let renderCard = (card) => {

    let handCard = document.createElement('div')
    handCard.classList.add(`hand__card${card.color}`)
    handCard.classList.add('card-to-play')
    handCard.setAttribute("id", card.id);
    handCard.classList.add("shadow")

    let handCardCircle = document.createElement('div')
    handCardCircle.classList.add(`hand__card--circle`)

    let handCardImg;

    switch (card.type) {
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

            let node = document.createTextNode(card.type)
            handCardNum.appendChild(node)

            handCardCircle.appendChild(handCardNum)
    }

    handCard.appendChild(handCardCircle)

    let hand = document.querySelector('.hand')
    if (hand != null) hand.appendChild(handCard)
}

let playHand = (id) => {
    let cards = document.querySelectorAll(".card-to-play")

    if (cards !== null) {
        cards.forEach(card => {
            card.addEventListener("click", function () {
                this.remove()
                axios.get(`/playHand/${id}/${this.id}`)
            })
        })
    }
}

module.exports = {
    getHand,
    playHand,
    renderCard
}