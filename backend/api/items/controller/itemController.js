const DAO = require('../DAO/itemDAO')

module.exports = app => {
    const { existsOrError } = app.config.validation
    const save = (req, res) => {
        let item = {...req.body}
        try {
            existsOrError(item.itemIdProduct, 'Iforme o produto do item')
            existsOrError(item.itemQuantity, 'Iforme a quantidade')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (item.itemId) {
            DAO.update(app, res, item)
        } else {
            DAO.save(app, res, item)
        }
    }

    const getItems = (req, res) => {
        if (req.body.idItem) {
            DAO.getItemsById(app, res, req.body.idItem)
        } else {
            DAO.getItems(app, res)
        }
    }

    const remove = (req, res) => {
        const id = req.body.itemId
        try {
            existsOrError(id, 'Informe o ID do item')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        DAO.remove(app, res, id)
    }

    return { save, getItems, remove }
}