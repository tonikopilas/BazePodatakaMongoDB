const mongoose = require('mongoose');


const AuthorSchema = mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    prezime: {
        type: String,
        required: true
    },
    broj_dijela: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('authors', AuthorSchema)