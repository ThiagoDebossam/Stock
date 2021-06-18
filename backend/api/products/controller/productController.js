const DAO = require('../DAO/productDAO')

module.exports = app => {
    const { existsOrError } = app.config.validation
    const save = (req, res) => {
        const product = {...req.body}
        try {
            existsOrError(product.productName, 'Informe o nome do produto')
        } catch (msg) {
            return res.status(500).send(msg)
        }
    }

    return { save }
}