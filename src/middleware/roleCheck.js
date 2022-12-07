module.exports = roleCheck = (req, res, next) => {
  if (req.session.loggedUser.id == 1) {
    console.log('hola')
  } else {
    console.log('chau')
  }
  next()
};
