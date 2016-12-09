
var return_Reghome=function (_rcode,_data){

	if(_rcode==200)						//Reghome Success
		return {
			title: "@REGHOME",
			rcode: _rcode,
			homeCode: _data
		};

	return {						
		title: "@REGHOME",				//Reghome Fail
		rcode: _rcode
	};


}

var return_RegNode=function (_rcode,_data){

	var ret={
			title: "@REGNODE",
			rcode: _rcode
		}

	if (_rcode==200) {

		 ret.code=_data.code
		 ret.nodeCode=_data.nodeCode
	}

	return ret


}

var return_SetNode=function (_rcode){

	return {						
		title: "@RSETNODE",				//Reghome Fail
		rcode: _rcode
	};

}

var return_Get=function (_rcode,_data){

	var ret={					
			title: "@RGET",				//Reghome Fail
			rcode: _rcode,		
	};

	if(_data){
		console.log(_data)
		var LDevice=[]
		_data.data.forEach(function(item){

			var dev={}
			dev.homeCode=item.HomeID
			dev.nodeCode=item.DID
			dev.status=item.Status
			dev.nodeName=item.DName
			dev.code=item.code
			LDevice.push(dev)


		})

		ret.LDevice=LDevice

	}

	return ret

}


var return_Login=function(_rcode,_data){

	var ret={					
			title: "@RLOGIN",				//Reghome Fail
			rcode: _rcode,		
	};

	return ret

}

var Return_Get_Home_By_Code=function(_rcode,_data){

	var ret={					
			title: "@RGET",				//Reghome Fail
			rcode: _rcode,		
	};

	if(_rcode==200){
		ret.code=_data.code
		ret.homeCode=_data.homeCode
		ret.LDevice=_data.LDevice
	}
	
	return ret


}

var Return_Update_Device_Power=function(_rcode){

	return {

		title: "@RUPDATEPOWER",
		rcode: _rcode

	}



}

module.exports=function(){

	return {

		return_Reghome: return_Reghome,
		return_RegNode: return_RegNode,
		return_SetNode: return_SetNode,
		return_Get: return_Get,
		return_Login: return_Login,
		Return_Get_Home_By_Code: Return_Get_Home_By_Code,
		Return_Update_Device_Power: Return_Update_Device_Power
	};


}


