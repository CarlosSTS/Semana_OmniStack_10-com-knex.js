const connection = require('../database/connection');
const axios = require('axios');

module.exports = {
    //validar
    async create(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await connection('dev')
            .where('github_username', github_username)
            .select('github_username')
            .first();

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            dev = await connection('dev').insert({
                github_username, name, avatar_url, bio, techs, latitude, longitude,
            });
        }

        return response.json(dev)
    },
    //todos os devs
    async index(request, response) {

        const dev = await connection('dev')
            .select(['dev.*']);

        return response.json(dev);
    },
}