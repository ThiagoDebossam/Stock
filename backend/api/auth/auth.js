const { authSecret } = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = (req, res) => {
        if (!req.body.password || !req.body.email) {
            return res.status(400).send('Informe o usuário e a senha')
        }
        app.db.query(`SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`, (err, result) => {
            if (err) return res.status(500).send(err)
            const user = result ? result[0] : []
            if (!user) return res.status(400).send('Usuário não encontrado!')
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) return res.status(400).send('Senha incorreta')

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: user.id,
                email: user.email,
                user_id_prof: user.user_id_prof,
                iat: now,
                exp: now + (60 * 60 * 24)
            }

            res.json({...payload, token: jwt.encode(payload, authSecret)})
        })
    }

    const validateToken = (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch {
            res.status(500).send('Sessão expirada. Por favor faça login novamente')
        }
    }

    return { signin, validateToken }
}