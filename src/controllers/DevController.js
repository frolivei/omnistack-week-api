const axios = require('axios');
const https = require('https');
const Dev = require('../models/Dev');

const GIT_HUB_API_URL = 'https://api.github.com';

function stringToArray(str) {
    return str.split(',').map(i => i.trim());
};


// index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // At instance level
            //const instance = axios.create({
            //    httpsAgent: new https.Agent({  
            //        rejectUnauthorized: false
            //    })
            //});
            //instance.get('https://something.com/foo');
            
            // At request level
            const agent = new https.Agent({  
                rejectUnauthorized: false
            });
            const responseAPI = await axios.get(`${GIT_HUB_API_URL}/users/${github_username}`, { httpsAgent: agent });
            
            const { name = login, avatar_url, bio } = responseAPI.data;

            console.log(latitude, longitude);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            const techsArray = stringToArray(techs);
            
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location,        
            });
        }
        return res.json(dev);
    }
}