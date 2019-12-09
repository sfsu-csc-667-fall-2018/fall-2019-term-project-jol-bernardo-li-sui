import { MESSAGE_SEND } from '../src/events.js'
const io = require('socket.io-client')
import globalChat from './chat/globalChat'
import './cards/deck.js'
import './cards/hand.js'
import './events/display'

globalChat.getGlobalMessages()

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')
if (chatBoxMessages != null) {
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

const socket = io();
socket.on(MESSAGE_SEND, globalChat.incomingMessage);

//send message on Global Chat
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