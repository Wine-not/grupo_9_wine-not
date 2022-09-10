const userController = {
    login: (req, res) => {
        res.render('./users/login');
    },
    register: (req, res) => {
        res.render('./users/register');
    },
    store: (req, res) => {
        res.redirect('./register');
    }
}

module.exports = userController;