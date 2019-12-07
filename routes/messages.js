const express = require('express');
const router = express.Router();
const db = require('../db/index')

/* game session page. */
router.get('/globalMessages', function(req, res, next) {
    db.query('SELECT ${messageBody:name}, ${username:name} FROM messages FULL JOIN users ON ${userId} = ${id} ', {
        messageBody: "messageBody",
        username: "username",
        userId: "messages.userId",
        id: "users.id"
    })
        .then( response => {
            console.log(response)
            res.send(response)
        })
        .catch(e => console.log(e))
});

module.exports = router;