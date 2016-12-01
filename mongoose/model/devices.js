var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an export function to encapsulate the model creation
module.exports = function() {
  // define schema
  var DeviceSchema = new Schema({
  	_id: String,
    DID: String,
    DName: String,
    Status: String,
    Current: String,
    HomeID: String,
    Rom: String
    
  });


 return mongoose.model('Device', DeviceSchema);
};