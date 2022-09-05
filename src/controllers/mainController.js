const controller = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('./users/login');
    },
    register: (req, res) => {
        res.render('./users/register');
    }
}

module.exports = controller;