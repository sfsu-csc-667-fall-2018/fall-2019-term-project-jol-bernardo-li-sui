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


router.get('/getUserData', (req, res) => {
    if(req.user){
        res.send(req.user)
    }
    else{
        res.send({username: null, userId: 0})
    }
})

module.exports = router
