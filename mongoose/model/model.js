
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
    Rom: String,
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
    code: String
  });

  var PowerSchema = new Schema({
    DID: String,
    Date: String,
    Capacity: String
  });

  var ConfigSchema = new Schema({
    Author: String,
    HomeCount: Number
  });

   var TimerSchema = new Schema({
    DID: String,
    Status: String,
    HomeID: String,
    DName: String,
    UID: String,
    Rom: String,
    Current: Number,
    code: String,
    Time: String,
    Executed: Number        //1= executed   0= no
  });

  
  var models = {
      user : mongoose.model('User', UserSchema),
      device: mongoose.model('Device', DeviceSchema),
      home: mongoose.model('Home', HomeSchema),
      power: mongoose.model('Power',PowerSchema),
      config: mongoose.model('Config',ConfigSchema)
   };

 return models
};
