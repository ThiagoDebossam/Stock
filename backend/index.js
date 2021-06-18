const   app     = require('express')()
        db      = require('./config/db')
        consign = require('consign')

app.db = db

consign()
    .include('./config/validation.js')
    .then('./config/middlewares.js')
    .then('./api/user')
    .then('./api/routes.js')
    .into(app)

app.listen(4000, () => {
    console.log('online')
})