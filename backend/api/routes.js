module.exports = app => {
    app.route('/user')
        .post(app.api.user.controller.userController.save)
        .delete(app.api.user.controller.userController.remove)
}