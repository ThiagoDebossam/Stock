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
        DAO.save(app, res, product)
    }

    const getProducts = (req, res) => {
        if (req.body.productId) {
            DAO.getProductsById(app, res, req.body.productId)
        } else {
            DAO.getProducts(app, res)
        }
    }

    const remove = (req, res) => {
        const id = req.body.productId
        try {
            existsOrError(id, 'Informe o ID do produto')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        DAO.remove(app, res, id)
    }

    return { save, getProducts, remove }
}