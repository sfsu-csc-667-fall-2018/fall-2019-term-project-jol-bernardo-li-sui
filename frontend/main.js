import { MESSAGE_SEND } from '../src/events'
import deck from './cards/hand.js'

const socket = io();

let user = "anon"

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')

if(chatBoxMessages != null){
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

const incomingMessage = data => {
    let chatBoxIncomingMessage = document.createElement("div")
    chatBoxIncomingMessage.classList.add('chat__box--incoming-message')

    let node = document.createTextNode(data.message)
    chatBoxIncomingMessage.appendChild(node);

    chatBoxMessages.appendChild(chatBoxIncomingMessage);

    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

socket.on( MESSAGE_SEND, incomingMessage);


const chatBoxButton = document.querySelector('.chat__box--button')
const chatBoxInput = document.querySelector('.chat__box--input')

if(chatBoxButton != null){
    chatBoxButton.addEventListener("click", (event) => {
        event.preventDefault()
        const message = chatBoxInput.value;
        socket.emit( MESSAGE_SEND, { message })
    
        chatBoxInput.value = ""
    })
}