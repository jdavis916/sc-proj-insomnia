//This will be for creating sequential id's in the database 
//for performance however, this method may not be used
//for now, this schema is not in use


const mongoose = require('mongoose');
//const express = require('express');
var Schema = mongoose.Schema;
//helps passport work with mongoose
var passportLocalMongoose = require('passport-local-mongoose');


var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});