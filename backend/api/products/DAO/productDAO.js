const save = (app, res, product) => {
    let query =  `
        INSERT INTO 
            products
        (product_name)
        VALUES
        ('${product.productName}')
    `
    app.db.query(query, (err,result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') err = 'Você não pode adicionar dois produtos iguais'
            return res.status(400).send(err)
        }
        res.status(200).send('Produto salvo com sucesso')
    })
}

const getProducts = (app, res) => {
    let query = `
        SELECT product_id AS productId, product_name AS productName
            FROM products
    `

    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

const getProductsById = (app, res, id) => {
    let query = `
        SELECT product_id AS productId, product_name AS productName 
            FROM products
        WHERE product_id = '${id}'
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

const remove = (app, res, id) => {
    const { notExistsOrError } = app.config.validation
    let queryValidate = `
        SELECT * FROM items
        INNER JOIN products ON product_id = item_id_products
        WHERE product_id = ${id}
    `
    let queryDelete = `
        DELETE FROM products
        WHERE product_id = '${id}'
    `
    app.db.query(queryValidate, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        try {
            notExistsOrError(result, 'Você não pode excluir um produto que possui items atrelados')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        app.db.query(queryDelete, (error, success) => {
            if (error) {
                return res.status(500).send(error)
            }
            res.status(200).send('Produto excluído com sucesso')
        })
    })
}

module.exports = { save, getProducts, getProductsById, remove }