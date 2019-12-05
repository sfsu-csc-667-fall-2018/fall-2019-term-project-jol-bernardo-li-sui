let db = require('../../db');
let bcrypt = require('bcrypt-nodejs');
let passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');


exports.signup = async function (req, res, next) {
	try{
		const hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
			db.any(`INSERT INTO users ("username","email","password") 
					VALUES ('${req.body.username}', '${req.body.email}','${hashedPassword}')`)
			db.any(`select * from users where (email = '${req.body.email}')`)
				.then(user => {
					console.log(user[0].password)
					console.log(req.body.password)
					console.log(bcrypt.compareSync(req.body.password, user[0].password))
				})
			res.redirect('./index');
			//console.log(hashPassword);
			//console.log(bcrypt.compare(user.password, hashPassword))
	} catch(e) {
		console.log(e)
		res.redirect('./index');
	}
}


exports.login = passport.authenticate('local', {
	successRedirect: "/authIndex",
	failureRedirect: "/error",
	failureFlash: true
})


exports.show_users = function (req, res, next) {
	db.any(`SELECT * FROM users`)
		.then(
			results => res.render('list_users', {result: results})
		)
		.catch( error => {
			console.log( error )
			res.json({ error })
		});
}