var express = require('express');
var router = express.Router();
let user = require('../auth/controllers/users');

checkAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/')
}

checkNotAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return res.redirect('./')
	}
	return next()
}

router.get('/authIndex', (req, res) => {
	currentUsername = req.user.username;
	res.render('authIndex',
		{username: req.user.username});
});
router.post('/login', user.login);
router.post('/signup', user.signup);

router.get('/list_users', checkAuthenticated, user.show_users)

router.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
})


router.get('/getUsername', _ => {
	res.send({username : req.user.username})
})

module.exports = router
