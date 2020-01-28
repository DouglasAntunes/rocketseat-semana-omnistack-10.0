const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArrayRegex = [];
        parseStringAsArray(techs)
            .forEach(tech => techsArrayRegex.push(new RegExp(tech, "i")));

        const devs = await Dev.find({
            techs: { $in: techsArrayRegex },
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
