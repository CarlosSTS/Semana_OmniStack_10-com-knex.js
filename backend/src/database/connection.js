const Knex= require('Knex');

const configuration= require('../../knexfile');

const connection= Knex(configuration.development);

module.exports=connection;