(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card(color, value) {
  _classCallCheck(this, Card);

  this.color = color;
  this.value = value;
};

var createDeck = function createDeck() {
  var colors = ['--red', '--blue', '--green', '--yellow'];
  var values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse'];
  var wildDeck = ['wild', 'wild', 'wild', 'wild', 'draw4', 'draw4', 'draw4', 'draw4'];
  var deck = [];

  for (var _i = 0, _colors = colors; _i < _colors.length; _i++) {
    var color = _colors[_i];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        deck.push(new Card(color, value));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  for (var _i2 = 0, _wildDeck = wildDeck; _i2 < _wildDeck.length; _i2++) {
    var wild = _wildDeck[_i2];
    deck.push(new Card("", wild));
  }

  return deck;
};

var shuffle = function shuffle(deck) {
  var counter = deck.length,
      temp,
      i;

  while (counter) {
    i = Math.floor(Math.random() * counter--);
    temp = deck[counter];
    deck[counter] = deck[i];
    deck[i] = temp;
  }
};

var deal = function deal(deck) {
  var hand = [];

  while (hand.length < 7) {
    hand.push(deck.pop());
  }

  return hand;
};

module.exports = {
  createDeck: createDeck,
  shuffle: shuffle,
  deal: deal
};

},{}],2:[function(require,module,exports){
"use strict";

var deck = require('./deck.js');

var deckInstance = deck.createDeck();
var hand = [];
deck.shuffle(deckInstance);
hand = deck.deal(deckInstance);
hand.map(function (card) {
  var handCard = document.createElement('div');
  handCard.classList.add("hand__card".concat(card.color));
  var handCardCircle = document.createElement('div');
  handCardCircle.classList.add("hand__card--circle");
  var handCardImg;

  switch (card.value) {
    case 'Reverse':
      handCardImg = document.createElement('img');
      handCardImg.classList.add("hand__card--img");
      handCardImg.src = "images/card_icons/reverse".concat(card.color, ".png");
      handCardCircle.appendChild(handCardImg);
      break;

    case 'Skip':
      handCardImg = document.createElement('img');
      handCardImg.classList.add("hand__card--img");
      handCardImg.src = "images/card_icons/skip".concat(card.color, ".png");
      handCardCircle.appendChild(handCardImg);
      break;

    case 'Draw Two':
      handCardImg = document.createElement('img');
      handCardImg.classList.add("hand__card--img");
      handCardImg.src = "images/card_icons/draw2".concat(card.color, ".png");
      handCardCircle.appendChild(handCardImg);
      break;

    case 'wild':
      handCardImg = document.createElement('img');
      handCardImg.classList.add("hand__card--img-wild");
      handCardImg.src = "images/card_icons/wild.png";
      handCardCircle.appendChild(handCardImg);
      break;

    case 'draw4':
      handCardImg = document.createElement('img');
      handCardImg.classList.add("hand__card--img-wild");
      handCardImg.src = "images/card_icons/draw4.png";
      handCardCircle.appendChild(handCardImg);
      break;

    default:
      var handCardNum = document.createElement('p');
      handCardNum.classList.add('hand__card--num');
      var node = document.createTextNode(card.value);
      handCardNum.appendChild(node);
      handCardCircle.appendChild(handCardNum);
  }

  handCard.appendChild(handCardCircle);
  var hand = document.querySelector('.hand');
  if (hand != null) hand.appendChild(handCard);
});

},{"./deck.js":1}],3:[function(require,module,exports){
"use strict";

var _events = require("../src/events");

var _hand = _interopRequireDefault(require("./cards/hand.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = io(); //sets chatbox scroll to bottom

var chatBoxMessages = document.querySelector('.chat__box--messages');

if (chatBoxMessages != null) {
  chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
}

var incomingMessage = function incomingMessage(data) {
  var chatBoxIncomingMessage = document.createElement("div");
  chatBoxIncomingMessage.classList.add('chat__box--incoming-message');
  var node = document.createTextNode(data.message);
  chatBoxIncomingMessage.appendChild(node);
  chatBoxMessages.appendChild(chatBoxIncomingMessage);
  chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
};

socket.on(_events.MESSAGE_SEND, incomingMessage);
var chatBoxButton = document.querySelector('.chat__box--button');
var chatBoxInput = document.querySelector('.chat__box--input');

if (chatBoxButton != null) {
  chatBoxButton.addEventListener("click", function (event) {
    event.preventDefault();
    var message = chatBoxInput.value;
    socket.emit(_events.MESSAGE_SEND, {
      message: message
    });
    chatBoxInput.value = "";
  });
}

},{"../src/events":4,"./cards/hand.js":2}],4:[function(require,module,exports){
"use strict";

var LOBBY = 'lobby';
var USER_JOINED = 'user-joined';
var MESSAGE_SEND = 'message-send';
module.exports = {
  LOBBY: LOBBY,
  USER_JOINED: USER_JOINED,
  MESSAGE_SEND: MESSAGE_SEND
};

},{}]},{},[3]);
