const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: { $in: techsArray },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: 10000,    //10KM
                }
            }
        })

        return response.json({ devs });
    },
};
