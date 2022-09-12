const fs = require('fs');
const path = require('path');
const { validationResult} = require('express-validator');
const usersFilePath = path.join(__dirname, '../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    login: (req, res) => {
        res.render('./users/login');
    },

    profile: (req, res) => {
        res.render('./users/profile');
    },

    register: (req, res) => {
        res.render('./users/register');
    },

    create: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let oldData = req.body;
            return res.render('./users/register', { errors: errors.mapped(), oldData });
        } else {
            let newUser = {
                id: users[users.length - 1].id + 1,
                ...req.body,
            };
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
            res.redirect('/users/login');
        }
    },

    edit: (req, res) => {
        let userId = req.params.idUser;
        let userToEdit = users.find(user => user.userId == userId);
        res.render('./users/edit', {userToEdit: userToEdit});
    },

    update: (req, res) => {
        let userId = req.params.userId;
        let userToEdit = users.find(user => user.userId == userId);

        userToEdit = {
            userId: req.body.nickname,
            ...req.body,
        }

        let usersUpdated = users.map(user => {
            if (user.userId == userToEdit.userId) {
                return user = {...userToEdit};
            }
            return user;
        })

        fs.writeFileSync(usersFilePath, JSON.stringify(usersUpdated, null, ' '));
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        res.redirect('./users/profile');
    }
}

module.exports = userController;