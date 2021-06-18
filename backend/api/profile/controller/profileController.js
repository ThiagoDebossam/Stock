const DAO = require('../DAO/profileDAO')

module.exports = app => {
    const getProfiles = (req, res) => {
        DAO.getProfiles(app, res)
    }

    return { getProfiles }
}