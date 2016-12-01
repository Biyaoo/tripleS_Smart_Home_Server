var HS=require('./Rfunc/Rhome_sv.js')()   // home to server

var mqttc

function Send_to_home(_topic,_msg){

	mqttc.publish(_topic,JSON.stringify(_msg))

}

var SendRsp_RegHome= function (_ClientID,_rcode,_data){

	console.log(_rcode,_data)
	return new Promise(function(resolve, reject) {
		
		return resolve(Send_to_home(_ClientID+"/RREGHOME",HS.return_Reghome(_rcode,_data)))

		
	});
}

var SendRsp_RegNode=function (_ClientID,_rcode,_data){


	console.log(_rcode,_data)
	return new Promise(function(resolve, reject) {
		
		return resolve(Send_to_home(_ClientID+"/RREGNODE",HS.return_RegNode(_rcode,_data)))

		
	});

}


var SendRsp_SetNode=function(_ClientID,_rcode){


	console.log(_rcode)
	return new Promise(function(resolve, reject) {
		
		return resolve(Send_to_home(_ClientID+"/RREGNODE",HS.return_SetNode(_rcode)))

		
	});

}

var SendRsp_Get=function(_ClientID,_rcode,_data){

	return new Promise(function(resolve, reject) {

		return resolve(Send_to_home(_ClientID+"/RGET",HS.return_Get(_rcode,_data)))



	});

}


var SendRsp_Login=function(_ClientID,_rcode){

	return new Promise(function(resolve, reject) {

		return resolve(Send_to_home(_ClientID+"/RLOGIN",HS.return_Login(_rcode)))



	});

}

var SendRsp_CGet=function(_ClientID,_rcode,_data){

	return new Promise(function(resolve, reject) {
		console.log(_data,_rcode,"deee")

		return resolve(Send_to_home(_ClientID+"/RCGET",HS.Return_Get_Home_By_Code(_rcode,_data)))


	});	

}

var SendRsp_Update_Device_Power=function(_ClientID,_rcode){

	return new Promise(function(resolve, reject) {

		return resolve(Send_to_home(_ClientID+"/RUPDATEPOWER",HS.Return_Update_Device_Power(_rcode)))

	});


}

module.exports=function (_mqttc){

	mqttc=_mqttc
	
	return {
		SendRsp_RegHome: SendRsp_RegHome,
		SendRsp_RegNode: SendRsp_RegNode,
		SendRsp_SetNode: SendRsp_SetNode,
		SendRsp_Get: SendRsp_Get,
		SendRsp_Login: SendRsp_Login,
		SendRsp_CGet: SendRsp_CGet,
		SendRsp_Update_Device_Power: SendRsp_Update_Device_Power
	};


}