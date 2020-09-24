const moongose = require('mongoose');

const fileSchema = new moongose.Schema({
    title: { type: String, index: true },
    description: String,
    page: String,
    year: Number,
    data: Array,
    user: String,
    section: String,
    yearFrom: Number,
    yearTo:Number
},{
    timestamps: true
});

var File = module.exports = moongose.model('file', fileSchema)

module.exports.get = function (callback, limit){
    File.find(callback).limit(limit);
}
