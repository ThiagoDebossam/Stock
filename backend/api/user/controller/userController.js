const userDAO = require('../DAO/userDAO')
const bcryprt = require('bcrypt-nodejs')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.config.validation
    const encryptPassword = password => {
        const salt = bcryprt.genSaltSync(10)
        return bcryprt.hashSync(password, salt)
    }
    const save = async (req, res) => {
        const user = {...req.body}
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        user.password = encryptPassword(user.password)
        delete user.confirmPassword
        if (user.userId) {
            userDAO.update(app, res, user)
        } else {
            userDAO.save(app, res, user)
        }
    }

    const remove = (req, res) => {
        const id = req.body.userId
        try {
            existsOrError(id, 'Informe o id do usuário')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        userDAO.remove(app, res, id)
    }
    return { save, remove }
}