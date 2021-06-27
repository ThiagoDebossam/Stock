module.exports = app => {
    app.post('/signin', app.api.auth.auth.signin)
    app.post('/token', app.api.auth.auth.validateToken)

    app.route('/user')
        .all(app.config.passport.authenticate())
        .post(app.api.user.controller.userController.save)
        .delete(app.api.user.controller.userController.remove)
        .get(app.api.user.controller.userController.getUsers)

    app.route('/profiles')
        .all(app.config.passport.authenticate())
        .get(app.api.profile.controller.profileController.getProfiles)
    
    app.route('/items')
        .all(app.config.passport.authenticate())
        .post(app.api.items.controller.itemController.save)
        .get(app.api.items.controller.itemController.getItems)
        .delete(app.api.items.controller.itemController.remove)
        
    app.route('/itemsSearch')
        .all(app.config.passport.authenticate())
        .post(app.api.items.controller.itemController.getItems)

    app.route('/products')
        .all(app.config.passport.authenticate())
        .post(app.api.products.controller.productController.save)
        .get(app.api.products.controller.productController.getProducts)
        .delete(app.api.products.controller.productController.remove)
}