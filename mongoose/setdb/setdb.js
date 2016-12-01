
var SetNodeStatus=function(_data){

	return new Promise(function(resolve, reject) {
	model.device.findOneAndUpdate({"DID":_data.nodeCode},{ $set: { "Status": _data.status }} , function (err, place) {
        
        
	        if(err) return reject(400)
	        return resolve(_data)
    	});
	});
}

var Create_User=function(_data){

	return new Promise(function(resolve, reject) {
		 model.user.findOne({ UID: _data.userID }, function(err, data) {
		 		if (err) return reject(400);
	            if (data) return reject(154);
	            model.user.create({UID: _data.userID, Password: _data.pwd },function(err,data){
	            	if (err) return reject(400);
	            	return reject(200)
	            })

	    });
	});
}

var Create_Home=function(_data){
	console.log("daaaaaa",_data)
	return new Promise(function(resolve, reject) {
		var hID=(_data.data.HomeCount+1);
		console.log("-------------------",hID)
		model.home.create({	HomeID: "H"+hID, UID: _data.userID,CDevice: 0 },function(err,data){
		            if (err) return reject(400);

		            	model.config.findOneAndUpdate({"Author": "tripleS"},{ $set: { "HomeCount": hID}} , function (err, place) {});
		            	return resolve("H"+hID)
		            })
	});


}

var Create_Node=function(_in){

	return new Promise(function(resolve, reject) {

		model.device.findOne({code: _in.code},function(err,data){   		// Check code exist

			if(err) return reject(400)

			if(data) return reject(152)
			console.log("IM heeee");										// node exist

			var CDevice=_in.data.CDevice+1;
			console.log("++++++++++++++",CDevice)
			var _nodeCode=_in.homeCode.substring(1)+"H"+CDevice

			model.device.create({DID: _nodeCode, Status: 0,code: _in.code},function(err,data){

				if (err) return reject(400)

				if(!data) return reject(400)

				model.home.findOneAndUpdate({HomeID: _in.homeCode},{ $set: { CDevice: CDevice }},function(err,data){

					if(err) return reject(400)

					if(!data) return reject(400)

					return resolve(_in,_in.nodeCode=_nodeCode)



				});

			})


		})


	});


}

var Update_Device_Power=function(_in){

	return new Promise(function(resolve, reject) {

		model.device.findOne({code: _in.code, HomeID: _in.homeCode},function(err,data){

			if (err) return reject(400)

			if(!data) return reject(102)

			data.Current+=parseInt(_in.power)
			console.log("power",data.Current)
			
			data.save(function (err) {
	        	if(err) console.log('ERROR!');
	        	return resolve(_in)
	        }); 
    	});

	});


}

module.exports= function(_model)
{

	model=_model

	return {

		SetNodeStatus: SetNodeStatus,
		Create_User: Create_User,
		Create_Home: Create_Home,
		Create_Node: Create_Node,
		Update_Device_Power: Update_Device_Power
	};
}