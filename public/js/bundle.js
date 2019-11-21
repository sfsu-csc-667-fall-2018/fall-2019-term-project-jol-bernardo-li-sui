(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card(color, value, circleColor) {
  _classCallCheck(this, Card);

  this.color = color;
  this.value = value;
  this.circleColor = circleColor;
};

var Wild = function Wild(wild) {
  _classCallCheck(this, Wild);

  this.wild = wild;
};

var createDeck = function createDeck(deck, colors, values) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = colors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var color = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          if (value === 'w' || value === 'w4') {
            deck.push(new Card('', value, "-wild"));
          } else {
            deck.push(new Card(color, value, ""));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
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

  return deck;
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

var deckInstance = [];
var hand = [];
var colors = ['--red', '--blue', '--green', '--yellow'];
var values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 'Draw Two', 'Draw Two', 'Skip', 'Skip', 'Reverse', 'Reverse', 'w', 'w', 'w', 'w', 'w4', 'w4', 'w4', 'w4'];
deck.createDeck(deckInstance, colors, values);
deck.shuffle(deckInstance);
hand = deck.deal(deckInstance);
hand.map(function (card) {
  var handCard = document.createElement('div');
  handCard.classList.add("hand__card".concat(card.color));
  var handCardCircle = document.createElement('div');
  handCardCircle.classList.add("hand__card--circle".concat(card.circleColor));
  var handCardNum = document.createElement('p');
  handCardNum.classList.add('hand__card--num');
  var node = document.createTextNode(card.value);
  handCardNum.appendChild(node);
  handCardCircle.appendChild(handCardNum);
  handCard.appendChild(handCardCircle);
  var hand = document.querySelector('.hand');
  hand.appendChild(handCard);
});

},{"./deck.js":1}],3:[function(require,module,exports){
"use strict";

var _events = require("../src/events");

var _hand = _interopRequireDefault(require("./cards/hand.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socket = io();
var user = "anon"; //sets chatbox scroll to bottom

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
