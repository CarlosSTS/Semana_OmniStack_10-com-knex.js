const express = require('express')
const routes = express.Router();

const DevController =require('./controller/DevController')
const SearchController =require('./controller/SearchController')

routes.post('/devs', DevController.create);//criar
routes.get('/devs',DevController.index)//listar
routes.get('/search',SearchController.search)//listar por techs

module.exports = routes;