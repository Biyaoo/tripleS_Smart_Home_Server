var model
var Get_UserData=function (_data){

	return new Promise(function(resolve, reject) {
	model.user.findOne({ UID: _data.userID }, function(err, data) {
		if(err){

			console.log(err)
			return reject(400)
		} 
		if (data)
			return resolve(_data,_data.data=data)
		return reject(104)

	});
  });
}

var Get_DeviceData=function (_data){

	return new Promise(function(resolve, reject) {
		model.device.findOne({ DID: _data.nodeCode }, function(err, data) {			

			if(err){
				throw err
				console.log(err)
				return reject(400)
				
			}
			if (!data) return reject(101);
			
			if(_data.homeCode!=data.HomeID) return reject(112)
			else{

					if (data){
						_data.code=data.code
						_data.DName=data.DName
						_data.Type=data.Type
						return resolve(_data,_data.data=data)
					}

					return reject(102)
			}

	});

  });
}

var Get_Device_Data=function (_data){

	return new Promise(function(resolve, reject) {
		model.device.findOne({ DID: _data.nodeCode }, function(err, data) {			

			if(err){
				throw err
				console.log(err)
				return reject(400)
				
			}
			if (!data) return reject(101);
			
			if(_data.homeCode!=data.HomeID) return reject(112)
			else{

					if (data){
						_data.code=data.code
						return resolve(_data,_data.device=data)
					}

					return reject(102)
			}

	});

  });
}

function Get_Deviceinfo(data){

	var dev={};
    dev["DID"]=data["DID"];
    dev["DName"]=data["DName"];
    dev["HomeID"]=data["HomeID"];
    dev["Rom"]=data["Rom"];
    dev["Status"]=data["Status"];
    dev["Current"]=data["Current"];
    dev["Type"]=data["Type"];

    return dev


}

var MGetNode_GetListDevice=function (_in){
	
	return new Promise(function(resolve, reject) {
		if(_in.data.Device.length<1) return reject(310)

		//	console.log("LDDDD",_in.data.Device)
		var listdev=[]
		var i=0;
		_in.data.Device.forEach(function(item){


			model.device.findOne({ DID: item }, function(err, data) {

				if (err) return reject(400);  // error
				listdev.push(Get_Deviceinfo(data))
				i++

				if(i==_in.data.Device.length) return resolve(listdev)

			});

		});
	});

}

var Get_All_Device_By_HomeCode=function(_in){

	return new Promise(function(resolve, reject) {

		model.device.find({HomeID: _in.homeCode}, function(err,data){

			if(err) return reject(400)
		

			if(!data) return reject(101)

			//console.log(data)
			var LDevice=[]

			data.forEach(function(item){
				var dev=Get_Deviceinfo(item)
				if(_in.data.Device.indexOf(item.DID)>-1)
					dev.Control=1
				else
					dev.Control=0
				LDevice.push(dev)


			});
			//console.log(arr)
			_in.LDevice=LDevice
			console.log("INNNNNNNNNN",_in,"INNNNN")
			return resolve(_in)

		});

	});		


}


var Get_configCollection=function(_in){

	return new Promise(function(resolve, reject) {

		model.config.findOne({ Author: "tripleS" }, function(err, data) {

			if(err) return reject(400)

			if(!data) return reject(400)

			return resolve(_in,_in.data=data)

		});

	});
}

var Get_Homeinfo=function(_in){

	return new Promise(function(resolve, reject) {

		model.home.findOne({HomeID: _in.homeCode}, function(err,data){

			if(err) return reject(400)

			if(!data) return reject(101)

			return resolve(_in,_in.data=data)

		});



	});

}

var Get=function(_in){

		return new Promise(function(resolve, reject) {
		model.device.find({ HomeID: _in.data.HomeID }, function(err, _data) {		
			console.log("++++++++++++===")	
			console.log(_in)
			console.log("++++++++++++===")	

			if(err){
				throw err
				console.log(err)
				return reject(400)
				
			}
			console.log("--------------------")
			console.log(_data)
			console.log("--------------------")
			return resolve(_in,_in.data=_data)

		});

  });



}


var Login=function(_in){

	return new Promise(function(resolve, reject) {

		model.home.findOne({Code: _in.code}, function(err,data){

			if(err) return reject(400)
		

			if(!data) return reject(101)

			if(data.UID!=_in.userID) return reject(105)	

			return resolve(_in,_in.data=data)

		});



	});	



}

var Get_Home_By_Code=function(_in){

	return new Promise(function(resolve, reject) {

		model.home.findOne({Code: _in.code}, function(err,data){

			if(err) return reject(400)
		

			if(!data) return reject(101)

			return resolve(data)

		});

	});		

}


var Get_All_Home_By_User=function(_in)	{

	return new Promise(function(resolve, reject) {
		var i=0
		var len=_in.data.HomeID.length
		var home=[]
		_in.data.HomeID.forEach(function(item){

			model.home.findOne({HomeID: item}, function(err,data){

				if(err) return reject(400)
			

				if(!data) return reject(105)		// failll

				home.push({homeCode: data.HomeID, homeName: data.HomeName})
				console.log(home)
				i++
				if(i==len)	{
					_in.home=home
					console.log("List Home:",_in.home)
					return resolve(_in)
				}

			});

		});

	});		


}


/* Get all device by HomeID 

	Out: List device have same HomeID

*/

var Get_All_Device_By_HomeID=function(_in){

	return new Promise(function(resolve, reject) {
		arr={}
		arr.Rom=_in.Rom

		model.device.find({HomeID: _in.HomeID}, function(err,data){

			if(err) return reject(400)
		

			if(!data) return reject(101)

			//console.log(data)

			arr.homeCode=_in.HomeID
			arr.code=_in.Code
			arr.LDevice=data
			//console.log(arr)
			return resolve(arr)

		});

	});		


}


var Get_Device_History_By_Home=function(_in)	{

	return new Promise(function(resolve, reject) {
		console.log("tttttt",_in.count)
		model.devicelog.find({HomeID: _in.homeCode, Time: {$lte: _in.timestart}, Time: {$gte: _in.timeend}},{}, {sort:{Time: -1}, limit: parseInt(_in.count), skip: parseInt(_in.skip)} ,	function(err,data)	{
			//console.log("degggggg",data)
			if (err) return reject(400);

			_in.LDevice=data

			return resolve(_in)


		})




	});

}

var Get_Timer_By_NodeCode=function(_in)	{

	return new Promise(function(resolve, reject) {
		console.log("tttttt",_in)
		model.timer.find({HomeID: _in.homeCode, DID: _in.nodeCode, UID: _in.userID},{}, {sort:{Time: -1}, limit: parseInt(_in.count), skip: parseInt(_in.skip)} ,	function(err,data)	{
			//console.log("degggggg",data)
			if (err) return reject(400);

			_in.LTimer=data

			return resolve(_in)


		})




	});

}

module.exports= function(_model)
{

	model=_model

	return {

		Get_UserData: Get_UserData,
		Get_DeviceData: Get_DeviceData,
		MGetNode_GetListDevice: MGetNode_GetListDevice,
		Get_configCollection: Get_configCollection,
		Get_Homeinfo: Get_Homeinfo,
		Get: Get,
		Login: Login,
		Get_Home_By_Code: Get_Home_By_Code,
		Get_All_Device_By_HomeID: Get_All_Device_By_HomeID,
		Get_All_Home_By_User: Get_All_Home_By_User,
		Get_Device_Data: Get_Device_Data,
		Get_Device_History_By_Home: Get_Device_History_By_Home,
		Get_Timer_By_NodeCode: Get_Timer_By_NodeCode,
		Get_All_Device_By_HomeCode: Get_All_Device_By_HomeCode
	};
}