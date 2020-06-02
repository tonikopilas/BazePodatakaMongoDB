const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    naziv: {
        type: String,
        required: true
    }, 
    datum_objave: {
        type: Date,
        default: Date.now
    },
    cijena: {
        type: Number,
        required: true
    },
    broj_stranica: {
        type: Number,
        required: true
    },
    ime_autora: 
        {   
            _id: Object,
            ime: String,
            prezime: String
           
        }
});

module.exports = mongoose.model('books', BookSchema);