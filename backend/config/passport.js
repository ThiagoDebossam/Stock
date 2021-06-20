const { authSecret } = require ('../.env'),
    passport = require('passport'),
    passportJwt = require('passport-jwt'),
    {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db.query(`SELECT * FROM users WHERE id = '${payload.id}' LIMIT 1`, (err, result) => {
            console.log(result, 'passport')
            if (result) {
                done(null, {...payload})
            } else {
                done(err, false)
            }
        })
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}