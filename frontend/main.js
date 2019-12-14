import {
    MESSAGE_SEND,
    GAME_MESSAGE_SEND,
    USER_JOINED
} from '../src/events.js'
const io = require('socket.io-client')
import globalChat from './chat/globalChat'
import { incomingMessage, getSessionMessages } from './chat/sessionChat' 
import { getSessionUsers, updateUsers } from './events/users'
import axios from 'axios'
import './cards/deck.js'
import './cards/hand.js'
import './events/display'

//get all global messages from db
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
let id = split[split.length-1]


let session = document.querySelector(".session")
if(session !== null){
    //get all session messages from db
    getSessionMessages(id)
    //get all users in session
    getSessionUsers(id)
}



//listen for socket events
const socket = io();
socket.on(MESSAGE_SEND, globalChat.incomingMessage);
socket.on(`${GAME_MESSAGE_SEND}/${split[split.length-1]}`, incomingMessage)
socket.on(`${USER_JOINED}/${id}`, updateUsers)

//send message from Global Chat
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

//send message from sessionChat
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