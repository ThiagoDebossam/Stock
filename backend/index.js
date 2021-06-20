const   app     = require('express')()
        db      = require('./config/db')
        consign = require('consign')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/validation.js')
    .then('./config/middlewares.js')
    .then('./api/auth')
    .then('./api/user/controller')
    .then('./api/profile/controller')
    .then('./api/items/controller')
    .then('./api/products/controller')
    .then('./api/routes.js')
    .into(app)

app.listen(4000, () => {
    console.log('online')
})