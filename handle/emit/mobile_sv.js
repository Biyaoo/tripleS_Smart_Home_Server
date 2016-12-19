var SM=require('./Rfunc/Rmobile_sv.js')()

var io,mqttc

function Sendby_socketid(_sid,_topic,_msg){

	io.sockets.connected[_sid].emit(_topic,JSON.stringify(_msg))

}

var SendRsp_MLogin= function(_sid,_rcode){

	Sendby_socketid(_sid,"RMLOGIN",SM.return_MLogin(_rcode))


}

var SendRsp_MSetNode=function(_sid,_rcode){

	Sendby_socketid(_sid,"RMSETNODE",SM.return_MSetNode(_rcode))

}

var SendRsp_MGetNode=function(_sid,_rcode,_data){

	console.log("----------------",_data)
	Sendby_socketid(_sid,"RMGETNODE",SM.return_MGetNode(_rcode,_data))

}

var SendRsp_MNode=function(_sid,_rcode,_dev){

	Sendby_socketid(_sid,"RMNODE",SM.return_MNode(_rcode,_dev))
	

}

var SendRsp_MReg=function(_sid,_rcode){

	Sendby_socketid(_sid,"RMREG",SM.return_MReg(_rcode))

}

var SendRsp_MSet_Timer=function(_sid,_rcode)	{

	Sendby_socketid(_sid,"RMSETTIMER",SM.return_MSet_Timer(_rcode))


}

var SendRsp_MGet=function(_sid,_rcode,_data){

	Sendby_socketid(_sid,"RMGET",SM.return_MGet(_rcode,_data))

}

var SendRsp_MGet_Device_History=function(_sid,_rcode,_data){

	Sendby_socketid(_sid,"RMGETHISTORY",SM.return_MGet_Device_History(_rcode,_data))

}

var Set_Up_Timer=function(_sid,_data)	{
	return new Promise(function(resolve, reject) {

		setTimeout(callback, _data.time- Get_Time_Now(), "Hello");
	});

}

function Get_Time_Now()	{
	var now = new Date();
	return now - (now.getTimezoneOffset() * 3600000)


}

var Send_Rsp_MGet_Timer=function(_sid,_rcode,_data)	{

	Sendby_socketid(_sid,"RMGETTIMER",SM.return_MGet_Timer(_rcode,_data))
	console.log("LAGGG")

}
module.exports=function(_io,_mqttc){
	mqttc=_mqttc
	io=_io
	//console.log(io)
	return {
		SendRsp_MLogin: SendRsp_MLogin,
		SendRsp_MSetNode: SendRsp_MSetNode,
		SendRsp_MGetNode: SendRsp_MGetNode,
		SendRsp_MNode: SendRsp_MNode,
		SendRsp_MReg: SendRsp_MReg,
		SendRsp_MSet_Timer: SendRsp_MSet_Timer,
		SendRsp_MGet: SendRsp_MGet,
		SendRsp_MGet_Device_History: SendRsp_MGet_Device_History,
		Send_Rsp_MGet_Timer: Send_Rsp_MGet_Timer

	};


}
