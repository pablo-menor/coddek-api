const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const companySchema = new Schema({
    name: {
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