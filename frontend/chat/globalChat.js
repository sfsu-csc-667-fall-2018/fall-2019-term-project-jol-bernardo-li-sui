import { MESSAGE_SEND } from '../../src/events'
import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

let getUsername = async () => {
    let username = await axios.get("/getUsername")
    return username
}

let getGlobalMessages = async () => {
    let response = await axios.get("/globalMessages")
    response.data.map( message => {
        console.log(message)
        incomingMessage(message)
    })
}

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')

if (chatBoxMessages != null) {
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

let incomingMessage = data => {
    let chatBoxIncomingMessage = document.createElement("div")

    getUsername()
        .then( username => {
            if (data.username === username.data) {
                chatBoxIncomingMessage.classList.add('chat__box--outgoing-message')
            } else {
                chatBoxIncomingMessage.classList.add('chat__box--incoming-message')
            }
        })

    let node = document.createTextNode(data.messageBody)
    chatBoxIncomingMessage.appendChild(node);

    chatBoxMessages.appendChild(chatBoxIncomingMessage);

    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
    document.querySelector('.chat__box--input').value = ""
}

module.exports = {
    getUsername,
    getGlobalMessages,
    incomingMessage
}