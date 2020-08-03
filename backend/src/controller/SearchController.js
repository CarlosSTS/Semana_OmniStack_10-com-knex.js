const connection = require('../database/connection');

module.exports={

    async search (request,response) {
    
const { techs}  = request.query;

const dev =await connection('dev')

.where('techs',techs)
.select(['dev.*']);

return response.json(dev);
},
}