const db = require('../data/dbConfig');

function addUser(user) {
    return db('users')
    .insert(user);
};

function findBy(filter) {
    return db('users')
    .select('id', 'name', 'password')
    .where(filter);
};

function getAll() {
    return db('users');
};

module.exports = {
    addUser,
    findBy,
    getAll
};