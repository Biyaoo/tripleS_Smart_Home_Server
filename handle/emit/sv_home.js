var SH=require('./Rfunc/Rsv_home.js')()   // server to home

var mqttc

function Send_to_home(_topic,_msg){

	mqttc.publish(_topic,JSON.stringify(_msg))

}

var Send_Control= function (_data){

	return new Promise(function(resolve, reject) {
		var _msg={

			homeCode: _data.homeCode,
			nodeCode: _data.nodeCode,
			status: _data.status,
			code: _data.code

		};
		var _topic=_data.homeCode+"/CONTROL"
		console.log("SYNCCCCCCCC")

		Send_to_home(_topic,SH.return_Control(_msg))   // send with topic = homeCode/CONTROL
		return resolve(_data)
	});
}


module.exports=function (_mqttc){

	mqttc=_mqttc
	//console.log(io)
	return {
		Send_Control: Send_Control
	};


}
