module.exports = app => {
    app.route('/user')
        .post(app.api.user.controller.userController.save)
        .delete(app.api.user.controller.userController.remove)
        .get(app.api.user.controller.userController.getUsers)

    app.route('/profiles')
        .get(app.api.profile.controller.profileController.getProfiles)
    
    app.route('/items')
        .post(app.api.items.controller.itemController.save)
        .get(app.api.items.controller.itemController.getItems)
        .delete(app.api.items.controller.itemController.remove)

    app.route('/products')
        .post(app.api.products.controller.productController.save)
}