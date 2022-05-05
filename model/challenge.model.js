const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const challengeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    tags: [
        {
            name: String,
        }
    ],
    archives: String
});

module.exports = mongoose.model("Challenge", challengeSchema);