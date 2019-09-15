const mongoose = require('mongoose');


//SCHEMA SETUP - Adding new images.
const collectionsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Collections = mongoose.model("Collections", collectionsSchema);

module.exports = Collections;
