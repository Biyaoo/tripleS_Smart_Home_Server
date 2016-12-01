var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function() {
  // define schema
  var UserSchema = new Schema({
        UID: String,Device: Array,Password: String, HomeID: Array,UName: String
    }, { versionKey: false });
var models = {
      user : mongoose.model('User', UserSchema)

    };

 return models
};