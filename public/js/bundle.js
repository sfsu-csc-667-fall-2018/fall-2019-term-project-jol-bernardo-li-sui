(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _events = require("../src/events");

var socket = io();
var user = "anon";
var chatBoxMessages = document.querySelector('.chat__box--messages');
chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;

var incomingMessage = function incomingMessage(data) {
  var chatBoxIncomingMessage = document.createElement("div");
  chatBoxIncomingMessage.classList.add('chat__box--incoming-message');
  var node = document.createTextNode(data.message);
  chatBoxIncomingMessage.appendChild(node);
  chatBoxMessages.appendChild(chatBoxIncomingMessage);
  chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
};

var initializeSocket = function initializeSocket() {
  socket.on(_events.MESSAGE_SEND, incomingMessage);
};

initializeSocket();
var chatBoxButton = document.querySelector('.chat__box--button');
var chatBoxInput = document.querySelector('.chat__box--input');
chatBoxButton.addEventListener("click", function (event) {
  event.preventDefault();
  var message = chatBoxInput.value;
  socket.emit(_events.MESSAGE_SEND, {
    message: message
  });
  chatBoxInput.value = "";
});

},{"../src/events":2}],2:[function(require,module,exports){
"use strict";

var LOBBY = 'lobby';
var USER_JOINED = 'user-joined';
var MESSAGE_SEND = 'message-send';
module.exports = {
  LOBBY: LOBBY,
  USER_JOINED: USER_JOINED,
  MESSAGE_SEND: MESSAGE_SEND
};

},{}]},{},[1]);
