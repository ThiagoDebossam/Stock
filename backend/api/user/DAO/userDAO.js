const save = async (app, res, user) => {
    await app.db.query(`SELECT email FROM users WHERE email = '${user.email}'`, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
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
            password = '${user.password}',
            user_id_prof = '${user.user_id_prof}'
        WHERE id = '${user.userId}'
    `
    app.db.query(query, (err, result)=> {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') err = 'Esse email já está em uso. Por favor, digite outro!'
            return res.status(500).send(err)
        }
        res.status(200).send('Usuário editado com sucesso!')
    })
}

const remove = (app, res, id) => {
    let query = `
        UPDATE users
        SET deletedAt = '${new Date()}'
        WHERE id = '${id}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('Usuário removido com sucesso!')
    })
}

const getUsers = (app, req, res) => {
    let where = 'WHERE deletedAt IS NULL'
    where += req.body.name          ? ` AND name         LIKE '%${req.body.name}%'`         : ''
    where += req.body.user_id_prof  ? ` AND user_id_prof = ${req.body.user_id_prof}`        : ''
    let query = `
    SELECT
    id AS userId, name, email, user_id_prof
    FROM users
    INNER JOIN profile ON prof_id = user_id_prof
    ${where}
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

const getUsersById = (app, res, id) => {
    let query = `
        SELECT
        id, name, email
        FROM users
        WHERE deletedAt IS NULL AND id = '${id}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

module.exports = { save, update, remove, getUsers, getUsersById }