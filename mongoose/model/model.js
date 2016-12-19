
// create an export function to encapsulate the model creation
module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  // define schema
  var UserSchema = new Schema({
        UID: String,Device: Array,Password: String, HomeID: Array,UName: String
    }, { versionKey: false });

  var HomeSchema = new Schema({
    HomeID: String,
    HomeName: String,
    Address: String,
    Rom: Array,
    UID: String,
    CDevice: Number,
    Code: String
  });

  var DeviceSchema = new Schema({
    DID: String,
    Status: String,
    HomeID: String,
    DName: String,
    Rom: String,
    Current: Number,
    code: String,
    Type: Number
  });

  var DeviceHistorySchema = new Schema({
    DID: String,
    Status: String,
    HomeID: String,
    DName: String,
    Rom: String,
    Time: String,
    UID: String,
    Type: Number
  }, { versionKey: false });

  var TimerSchema = new Schema({
    DID: String,
    Status: String,
    HomeID: String,
    DName: String,
    Rom: String,
    Time: String,
    UID: String,
    Exc: Number
  }, { versionKey: false });

  var PowerSchema = new Schema({
    DID: String,
    Date: String,
    Capacity: String
  });

  var ConfigSchema = new Schema({
    Author: String,
    HomeCount: Number
  });


  
  var models = {
      user : mongoose.model('User', UserSchema),
      device: mongoose.model('Device', DeviceSchema),
      home: mongoose.model('Home', HomeSchema),
      power: mongoose.model('Power',PowerSchema),
      config: mongoose.model('Config',ConfigSchema),
      devicelog: mongoose.model('Devicelog',DeviceHistorySchema),
      timer: mongoose.model('Timer',TimerSchema)
   };

 return models
};
