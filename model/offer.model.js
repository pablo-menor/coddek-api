const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const offerSchemma = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    studiesRequired: {
        type: String,
        required: false,
    },
    experienceRequired: {
        type: String,
        required: false,
    },
    company: {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
            default: 'default_avatar_company.jpg',
        },
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        amount: {
            type: String,
        },
        currency: {
            type: String,
        },
        required: false,
    },
    tags: [
        {
            name: String,
        }
    ],
    ongoing: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    challangeId: {
        type: String
    }
}); 

module.exports = mongoose.model('Offer', offerSchemma);