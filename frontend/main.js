import {
    MESSAGE_SEND,
    GAME_MESSAGE_SEND
} from '../src/events.js'
const io = require('socket.io-client')
import globalChat from './chat/globalChat'
import { incomingMessage, getSessionMessages } from './chat/sessionChat' 
import axios from 'axios'
import './cards/deck.js'
import './cards/hand.js'
import './events/display'

let indexChat = document.querySelector(".chat")
if(indexChat !== null){
    globalChat.getGlobalMessages()
}

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')
if (chatBoxMessages != null) {
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

let url = window.location.href;
let split = url.split('/');

let session = document.querySelector(".session")
if(session !== null){
    getSessionMessages(split[split.length-1])
}

const socket = io();
socket.on(MESSAGE_SEND, globalChat.incomingMessage);
socket.on(`${GAME_MESSAGE_SEND}/${split[split.length-1]}`, incomingMessage)

//send message on Global Chat
const chatBoxButton = document.querySelector('.chat__box--button')

if (chatBoxButton != null) {
    chatBoxButton.addEventListener("click", (event) => {
        event.preventDefault()

        const chatBoxInput = document.querySelector('.chat__box--input')
        
        axios.post("/sendMessage", {
                messageBody: chatBoxInput.value
            })
            .then(res => console.log(res))
            .catch(e => console.log(e))

    })

    chatBoxInput.value = ""
}

const sessionChatFormButton = document.querySelector(".session-chat__form--button")

if( sessionChatFormButton !== null){
    sessionChatFormButton.addEventListener("click", (event) => {
        event.preventDefault()

        let sessionChatFormInput = document.querySelector('.session-chat__form-input')

        axios.post(`/sendMessage/${split[split.length-1]}`, {
            messageBody: sessionChatFormInput.value
        })
    })
}