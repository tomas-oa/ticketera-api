const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    asientos: [{
        estado: {
            type: String,
            required: true
        },
        iduser: {
            type: String,
            required: true
        }   
    }],
});

module.exports = mongoose.model('Event', eventSchema);  