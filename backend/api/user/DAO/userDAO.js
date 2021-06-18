const save = async (app, res, user) => {
    await app.db.query(`SELECT email FROM users WHERE email = '${user.email}'`, (err, result) => {
        if (result.length > 0) {
            return res.status(400).send('Usuário já cadastrado')
        } else {
            app.db.query('INSERT INTO users SET ?', user)
            res.status(200).send('Usuário incluído com sucesso!')
        }
    })
}

const update = async (app, res, user) => {
    let query = `
        UPDATE users 
        SET name = '${user.name}',
            email = '${user.email}',
            password = '${user.password}'
        WHERE id = '${user.userId}'
    `
    app.db.query(query, (err, result)=> {
        res.status(200).send('Usuário incluído com sucesso!')
    })
}

const remove = (app, res, id) => {
    let query = `
        UPDATE users
        SET deletedAt = '${new Date()}'
        WHERE id = '${id}'
    `
    app.db.query(query, (err, result) => {
        res.status(200).send('Usuário removido com sucesso!')
    })
}

module.exports = { save, update, remove }