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
        type: Number,
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
    }
}); 

module.exports = mongoose.model('Offer', offerSchemma);