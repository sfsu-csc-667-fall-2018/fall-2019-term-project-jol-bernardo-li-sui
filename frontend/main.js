import { MESSAGE_SEND } from '../src/events'

const socket = io();

let user = "anon"
const chatBoxMessages = document.querySelector('.chat__box--messages')
chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight

const incomingMessage = data => {
    let chatBoxIncomingMessage = document.createElement("div")
    chatBoxIncomingMessage.classList.add('chat__box--incoming-message')

    let node = document.createTextNode(data.message)
    chatBoxIncomingMessage.appendChild(node);

    chatBoxMessages.appendChild(chatBoxIncomingMessage);

    chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight
}

const initializeSocket = () => {
    socket.on( MESSAGE_SEND, incomingMessage);
}

initializeSocket();

const chatBoxButton = document.querySelector('.chat__box--button')
const chatBoxInput = document.querySelector('.chat__box--input')

chatBoxButton.addEventListener("click", (event) => {
    event.preventDefault()
    const message = chatBoxInput.value;
    socket.emit( MESSAGE_SEND, { message })

    chatBoxInput.value = ""
})