import { MESSAGE_SEND } from '../src/events'
const socketIo = require( 'socket.io' )
import deck from './cards/hand.js'
import display from './events/display'
import axios from 'axios'

const socket = io();

let username = ""

axios.get("/getUsername")
    .then( res => {
        username = res.data
    })
    .catch(e => console.log(e))

//sets chatbox scroll to bottom
const chatBoxMessages = document.querySelector('.chat__box--messages')

if(chatBoxMessages != null){
    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

const incomingMessage = data => {
    let chatBoxIncomingMessage = document.createElement("div")
    if(data.username === username){
        chatBoxIncomingMessage.classList.add('chat__box--outgoing-message')
    }else {
        chatBoxIncomingMessage.classList.add('chat__box--incoming-message')
    }

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
        socket.emit( MESSAGE_SEND, {
            message: message,
            username: username
        })
    
        chatBoxInput.value = ""
    })
}