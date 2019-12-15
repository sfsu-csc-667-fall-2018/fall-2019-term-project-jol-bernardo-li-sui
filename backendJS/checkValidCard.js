function colorCard(card, graveYardCard) {
    if(card.dataValues.color == graveYardCard.dataValues.color || card.dataValues.value == graveYardCard.dataValues.value) {
        return true
    } else {
        return false
    }
}

module.exports = {colorCard}