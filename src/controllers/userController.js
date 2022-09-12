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
        let user = {
            userId: req.body.nickname,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            birthdate: req.body.birthdate,
        }



        res.redirect('./users/login');
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
        res.redirect('./users/profile');
    }
}

module.exports = userController;