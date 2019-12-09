const db = require('../data/dbConfig');

function addUser(user) {
    return db('users')
    .insert(user);
};

function findById(id) {
    return db('users')
    .where(id);
}

function login(user) {
    //Authenticate

}

module.exports = {
    addUser,
    login
}