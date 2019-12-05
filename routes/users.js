var express = require('express');
var router = express.Router();
let user = require('./controllers/users');


let currentUsername;


function checkAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')
}

function checkNotAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return res.redirect('./authenticatedIndex')
	}
	return next()
}

router.get('/authIndex', (req, res) => {
	currentUsername = req.user.username;
	res.render('authIndex',
		{username: req.user.username});
});
router.get('/login', checkNotAuthenticated,(req, res) => res.render('login'));
router.get('/signup', checkNotAuthenticated,(req, res) => res.render('signup'));
router.post('/login', user.login);
router.post('/signup', user.signup);

router.get('/list_users', checkAuthenticated, user.show_users);

router.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
})




module.exports = router;
