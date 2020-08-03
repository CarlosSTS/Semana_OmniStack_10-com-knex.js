exports.up = function (knex) {
    return knex.schema.createTable('dev', function (table) {

        table.increments();//id numero

        table.string('name').notNullable();
        table.string('github_username').notNullable();
        table.string('bio').notNullable();
        table.string('avatar_url').notNullable();
        table.string('techs').notNullable();
        table.float('latitude').notNullable();;
        table.float('longitude').notNullable();;

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('dev');
};




