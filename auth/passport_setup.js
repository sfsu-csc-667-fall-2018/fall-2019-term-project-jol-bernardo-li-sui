let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');
let db = require('../db');

const validPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password); // compare the bcrypted password to the real password (hash value)
}
module.exports = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = (req, email, password, done) => {
        db.any(`select * from users where (email = '${req.body.email}')`)
            .then(user => {
                if (Object.keys(user).length === 0) {
                    console.log(Object.keys(user).length)
                    console.log('no user')
                    //req.flash('message', 'Incorrect username')
                    return done(null, false)
                } else if (req.body.password == null || req.body.password == undefined) {
                    console.log('no password')
                    //req.flash('message', 'no password')
                    return done(null, false)
                } else if (!validPassword(req.body.password, user[0])) {
                    console.log('password incorrect')
                    //req.flash('message', 'no password')
                    return done(null, false)
                } else{
                    return done(null, user[0])
                }
            }).catch(e => {
                console.log(e)
            })
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authenticateUser))


    passport.serializeUser((user, done) => {
        return done(null, user)
    })
    passport.deserializeUser((user, done) => {
        return done(null, user)
    })






    /*
    passport.serializeUser(function(user, done) {
    	console.log(user.id);
    	done(null, user.id)
    });
    passport.deserializeUser( function(user, done) {
    	db.any(`select * from users_table_demo where (username = '${req.body.user_name}')`)
    		.then( user => {
    			if (Object.keys(user).length === 0) {
    				done(new Error('Wrong user id.'))
    			}
    			done(null, user)

    								results => {
    									if(Object.keys(results).length === 0)
    									{
    										console.log('no such user')
    										res.render('login', {})
    									} else {
    										res.render('list_users', {result: results}),
    											console.log(results[0].username)
    									}

    		})
    });
    passport.use(new LocalStrategy({
    		usernameField : 'email' ,
    		passwordField : 'password',
    		passReqToCallback: true
    },
    	function (req, username, password, done){
    		return db.any(`select * from users_table_demo where (username = '${req.body.user_name}')`)
    			.then(user => {
    				if (Object.keys(user).length === 0) {
    					req.flash('message', 'Incorrect username/password')
    					return done(null, false)
    				} else if(req.body.user_password == null || req.body.user_password == undefined) {
    					req.flash('message', 'no password')
    					return done(null, false)
    				} else if(!validPassword(user, password)){
    					req.flash('message', 'no password')
    					return done(null, false)
    				}
    				return done(null, user);
    			}).catch(err => {
    				done(err, false);
    			})
    	}))
    	*/
}