const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    avatar_url: String,
    bio: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
});

module.exports = mongoose.model('Dev', DevSchema);
