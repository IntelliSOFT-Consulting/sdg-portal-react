const formidable = require('formidable');
let multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

//import File model
const File = require('../models/file.model.js');

//Create and save new file
exports.create = function(req, res) {
    const fileData = []
    const form = formidable.IncomingForm({ 
        multiples: true,
        uploadDir: __dirname + '../../../public' 
     });
     
    form.parse(req, (err, fields, files) => {
            //Create new file record
            const file = new File({
                title: fields.title,
                description: fields.description,
                page: fields.page,
                year: fields.year,
                yearFrom: fields.yearFrom,
                yearTo:fields.yearTo,
                section: fields.section,
                user:fields.user,
                data: JSON.parse(fields.fileData)
            });

            //Save file record in database
            file.save({ checkKeys: false }, function(err, record){
                if (err) return console.error(err);
                res.json({
                    data: file
                })
            })
    })
}

// Retrieve and return all files from the database.
exports.findAll = function (req, res) {
  //  console.log(res)
    File.get(function(err, files){
        if(err){
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Files retrieved successfully",
            data: files
        })
    })
  };


// Find a single files with a fileId
exports.findOne = (req, res) => {
    const id = req.params.id;
    File.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: "No file found with id", id})
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500)
                .send({message: "Error retrieving file with id", id})
        })

};

// Update a file identified by the filesId in the request
exports.update = (req, res) => {

};

// Delete a file with the specified filesId in the request
exports.delete = (req, res) => {

};