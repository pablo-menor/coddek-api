const mongoose = require('mongoose');
const developerModel = require('./developer.model');

const Schema = mongoose.Schema;
const companySchema = new Schema({
    role: {
        type: String,
        default: 'company'
    }
    ,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    website: String,
    avatar: {
        type: String,
        default: 'default_avatar_company.jpg',
        url: String,
    },
    offers_published: [
        {
            offerId: String,
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },

})


module.exports = mongoose.model('Company', companySchema)