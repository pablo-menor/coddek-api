const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const devSchema = new Schema({
    role: {
        type: String,
        default: 'developer'
    }
    ,
    username: {
        type: String,
        required: true,
        unique: true,
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
    avatar: {
        type: String,
        default: 'default_avatar_dev.jpg',
        url: String,
    },
    name: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    github: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,
    },
    applied_offers: [
        {
            offerId: String,
            show: {
                type: Boolean,
                default: true,
            },
            files: String
                
            
        }
    ],
    offers_saved: [
        {
            offerId: String,
        }
    ],
    stars: {
        type: Number,
        default: 0,
    },
    cv: [
        {
            title: String, // Set by the user to identify the file
            fileName: String, 
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Developer', devSchema)