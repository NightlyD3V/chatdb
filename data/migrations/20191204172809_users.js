
exports.up = function(knex) {
  return knex.schema.createTable('users', (user) => {
    user.increments();
    user.string('name')
        .notNullable()
        .unique();
    user.string('password')
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
