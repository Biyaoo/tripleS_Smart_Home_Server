
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

		model.device.findOne({DID: _in.nodeCode, HomeID: _in.homeCode},function(err,data){

			if (err) return reject(400)

			if(!data) return reject(102)

			data.Current+=parseInt(_in.power)
			console.log("power",data.Current)
			
			data.save(function (err) {
	        	if(err) console.log('ERROR!');
	        	return resolve(_in,_in.cpower=data.Current)
	        }); 
    	});

	});


}

function Get_Time_Now()	{
	var now = new Date();
	return now - (now.getTimezoneOffset() * 3600000)


}

var Create_Log_Device=function(_in)	{
	return new Promise(function(resolve, reject) {
		model.devicelog.create({ HomeID: _in.homeCode, DID: _in.nodeCode, DName: _in.DName, Status: _in.status, Time: Get_Time_Now(), UID: _in.userID }, function (err, small) {
			  console.log("eeee",small)
			  if (err) return reject(400);	
			  
			  return resolve(_in)
		})
	});


}

var Create_Timer=function(_in)	{
	return new Promise(function(resolve, reject) {
		model.timer.create({HomeID: _in.homeCode, DID: _in.nodeCode, DName: _in.DName, Status: _in.status, Time: _in.time, UID: _in.userID, Exc: 0},function(err,data){

			if (err) return reject(400);

			return resolve(_in)

		});
	});


}

var Update_Status_Timer=function(_data){

	return new Promise(function(resolve, reject) {
	model.timer.findOneAndUpdate({DID:_data.nodeCode, Time: _data.time},{ $set: { Exc: 1 }} , function (err, data) {
        
	        if(err) return reject(400)
	        console.log("sau updatteee",data)
	        return resolve(_data)
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
		Update_Device_Power: Update_Device_Power,
		Create_Log_Device:  Create_Log_Device,
		Create_Timer: Create_Timer,
		Update_Status_Timer: Update_Status_Timer
	};
}