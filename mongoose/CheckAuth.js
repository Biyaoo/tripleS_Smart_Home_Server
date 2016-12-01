var model=require('../model/devices.js')
var device=new model()

exports.auth= function(callback){
	device.findOne({ DID: '1H1' }, function(err, data) {
		callback(err,data)
});

}