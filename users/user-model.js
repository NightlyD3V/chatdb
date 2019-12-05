const db = require('../data/dbConfig');

function addUser(user) {
    return db('users')
    .insert(user);
};

module.exports = {
    addUser
}