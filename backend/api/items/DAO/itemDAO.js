const save = (app, res, item) => {
    let query = `
        INSERT INTO items
        (quantity,item_id_products)
        VALUES
        ('${item.itemQuantity}', '${item.itemIdProduct}')
    `
    app.db.query(query, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') err = 'Você não pode duplicar um produto, somento adicionar ou remover quantidades'
            return res.status(500).send(err)
        }

        res.send('Item adicionado com sucesso')
    })
}

const update = (app, res, item) => {
    let query = `
        UPDATE items
        SET quantity = '${item.itemQuantity}',
            item_id_products = '${item.itemIdProduct}'
        WHERE id_item = '${item.itemId}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') err = 'Você não pode duplicar um produto, somento adicionar ou remover quantidades'
            return res.status(500).send(err)
        }
        res.status(200).send('Item alterado com sucesso')
    })
}

const remove = (app, res, id) => {
    let query = `
        DELETE FROM items
        WHERE id_item = '${id}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('Item excluído com sucesso')
    })
}

const getItems = (app, res) => {
    let query = `
        SELECT * FROM items
	    INNER JOIN products ON product_id = item_id_products
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

const getItemsById = (app, res, id) => {
    let query = `
        SELECT * FROM items
	    INNER JOIN products ON product_id = item_id_products
        WHERE id_item = '${id}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

module.exports = { save, getItems, getItemsById, update, remove }