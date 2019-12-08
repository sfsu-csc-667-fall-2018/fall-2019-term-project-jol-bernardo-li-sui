import { MESSAGE_SEND } from '../src/events.js'
const io = require('socket.io-client')
import globalChat from './chat/globalChat'
import deck from './cards/hand.js'
import display from './events/display'

globalChat.getGlobalMessages()

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')
if (chatBoxMessages != null) {
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

const socket = io();
socket.on(MESSAGE_SEND, globalChat.incomingMessage);


const chatBoxButton = document.querySelector('.chat__box--button')
const chatBoxInput = document.querySelector('.chat__box--input')

if (chatBoxButton != null) {
    chatBoxButton.addEventListener("click", (event) => {
        event.preventDefault()
        globalChat.getUserData().then( user => {
            socket.emit(MESSAGE_SEND, { 
                messageBody: chatBoxInput.value,
                username: user.data.username
            })
        })
    })
    
    chatBoxInput.value = ""
}