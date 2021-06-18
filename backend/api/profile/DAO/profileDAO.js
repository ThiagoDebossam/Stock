const getProfiles = (app, res) => {
    let query = `
        SELECT * FROM profile
    `
    app.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

module.exports = { getProfiles }