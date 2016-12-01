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
						console.log("codeeeeee",_data.code)
						return resolve(_data,_data.data=data)
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

		model.device.find({HomeID: _in.HomeID}, function(err,data){

			if(err) return reject(400)
		

			if(!data) return reject(101)

			//console.log(data)
			arr={}
			arr.homeCode=_in.HomeID
			arr.code=_in.Code
			arr.LDevice=data
			//console.log(arr)
			return resolve(arr)

		});

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
		Get_All_Home_By_User: Get_All_Home_By_User
	};
}