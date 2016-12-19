var func=require('./function/function.js')()
var func1=require('./function/home_to_server.js')()
var query,mqttc,io
var setdb,MtoSv,StoH,SvtoM
//var MtoSv

var server={}		// Server info (connection,all client)
server.LUser=[]
server.timer=[]
server.connection=0


function Sendby_socketid(_sid,_topic,_msg){

	io.sockets.connected[_sid].emit(_topic,JSON.stringify(_msg))

}


var handle_MLogin=function(msg,_sid){

	func.Parse_json(msg)
			.then((i) => {	return query.Get_UserData(i)})  	// get user data
			.then((i) => {	return func.Check_Password(i)})		// Check password
			.then((i) => {
				MtoSv.SendRsp_MLogin(_sid,200)					// send respond to client
				server.LUser.push(func.MLogin_GetUserInfo(i,_sid))	// add list device of user for SYNC


			})
			.catch((err) => {	MtoSv.SendRsp_MLogin(_sid,err) })

}

var handle_MGet=function(msg,_sid){

	func.Parse_json(msg)
			.then((i) => {	return func.MGet_Check_Syntax(i)})  	// Check syntax
			.then((i) => {	return query.Get_UserData(i)})  	// get user data
			.then((i) => {	return query.Get_All_Home_By_User(i)})  	
			.then((i) => {console.log("return:",i);	return MtoSv.SendRsp_MGet(_sid,200,i)})  	
			.catch((err) => {	MtoSv.SendRsp_MGet(_sid,err,"") })

}


var handle_MSetNode=function(msg,_sid){

	func.Parse_json(msg)
			.then((i) => {	return query.Get_DeviceData(i)	})   	// get device data
			.then((i) => {		return func.MSetNode_Syntax(i)	})		// check syntax
			.then((i) => {	return query.Get_UserData(i)})			// get user data
			.then((i) => {	return func.MSetNode_CheckUser(i)	})		// check user permission
			.then((i) => {	return StoH.Send_Control(i)		})		// send control signal to home
			.then((i) => {	return setdb.SetNodeStatus(i)	})		// update database
			.then((i) => {	console.log("printtt",i); return setdb.Create_Log_Device(i) })
			.then((i) => {	console.log("printtt111",i)
							SvtoM.SYNC_Mobile(i,server.LUser,_sid)	// send SYNC signal
							MtoSv.SendRsp_MSetNode(_sid,200)		// send respond to client
						 })			
			.catch((err) => {	MtoSv.SendRsp_MSetNode(_sid,err) })		// Fail, send error to client


}

var handle_MGetNode=function(msg,_sid){

	func.Parse_json(msg)
		.then((i) => {	return query.Get_UserData(i)})
		.then((i) => {	return query.Get_All_Device_By_HomeCode(i)})		// get list device by user
		.then((i) => {console.log(i);	return MtoSv.SendRsp_MGetNode(_sid,200,i)})
		.catch((err) => {console.log("---",err,"---");	return MtoSv.SendRsp_MGetNode(_sid,err) })




}

var handle_MNode=function(msg,_sid){

	func.Parse_json(msg)
			.then((i) => {	return query.Get_DeviceData(i)	})  
			.then((i) => {	MtoSv.SendRsp_MNode(_sid,200,i.data)	})			// send respond to client
			.catch((err) => {console.log(err);	MtoSv.SendRsp_MNode(_sid,err) })		// Fail, send error to client


}

var handle_MReg=function(msg,_sid){

	func.Parse_json(msg)
			.then((i) => {	return func.MReg_CheckSyntax(i)	})  
			.then((i) => {	return setdb.Create_User(i)	})			
			.then((i) => {	return MtoSv.SendRsp_MReg(_sid,i)	})					// send respond to client
			.catch((err) => {console.log(err);	MtoSv.SendRsp_MReg(_sid,err) })		// Fail, send error to client


}

var handle_MGetHistory=function(msg,_sid)	{

	func.Parse_json(msg)
			.then((i) => {	return func.MGetHistory_Syntax(i)	})		// check syntax
			.then((i) => {	return query.Get_UserData(i)})			// get user data
			.then((i) => {	return func.Check_User_Permission_By_Home(i)	})		// check user permission
			.then((i) => {	return query.Get_Device_History_By_Home(i)		})		// 
			.then((i) => {	return MtoSv.SendRsp_MGet_Device_History(_sid,200,i) })
		
			.catch((err) => {	MtoSv.SendRsp_MGet_Device_History(_sid,err,"") })		// Fail, send error to client

}

var handle_MSetTimer=function(msg,_sid)	{

	func.Parse_json(msg)
			.then((i) => {	return func.MSet_Timer_Check_Syntax(i)	})  
			.then((i) => {	return query.Get_DeviceData(i)	})   	// get device data
			.then((i) => {	return func.MSetNode_Syntax(i)	})		// check syntax
			.then((i) => {console.log("faill",i);	return query.Get_UserData(i)})			// get user data
			.then((i) => {		return func.MSetNode_CheckUser(i)	})		// check user permission	
			.then((i) => {	return Set_Up_Timer(i)	})	
			.then((i) => {	return setdb.Create_Timer(i)	})		
			.then((i) => {	return MtoSv.SendRsp_MSet_Timer(_sid,200)	})					// send respond to client
			.catch((err) => {console.log(err);	MtoSv.SendRsp_MSet_Timer(_sid,err) })		// Fail, send error to client


}
function Get_Time_Now()	{
	var now = new Date();
	return now - (now.getTimezoneOffset() * 3600000)


}

var Set_Up_Timer=function(_data)	{
	return new Promise(function(resolve, reject) {
		console.log("timer:",_data.time- Get_Time_Now())
		var tim=setTimeout(Enable_Timer, _data.time- Get_Time_Now(),_data);
		tim.nodeCode=_data.nodeCode
		tim.time=_data.time
		server.timer.push(tim)
		console.log("TIMMMM",tim)
		return resolve(_data)
	});

}

var Enable_Timer=function(_data)	{
	console.log("DATTT",_data)

	StoH.Send_Control(_data)				// send control signal to home
			.then((i) => {	return setdb.SetNodeStatus(i)	})		// update database
			.then((i) => {	return setdb.Update_Status_Timer(i)})
			.then((i) => {	console.log("printtt",i); return setdb.Create_Log_Device(i) })
			.then((i) => {	SvtoM.SYNC_Mobile(i,server.LUser,"") })		// send SYNC signal					 		
			.catch((err) => {	console.log("Timer fail with err:",err) })		// Fail, send error to client

}

var handle_MGetTimer=function(msg,_sid)	{

	func.Parse_json(msg)
			.then((i) => {	return func.MGetTimer_Syntax(i)	})		// check syntax
			.then((i) => {	return query.Get_UserData(i)})			// get user data
			.then((i) => {	return func.Check_User_Permission_By_Home(i)	})		// check user permission
			.then((i) => {	return query.Get_Timer_By_NodeCode(i)		})		// 
			.then((i) => {console.log("heerrrr",i);	return MtoSv.Send_Rsp_MGet_Timer(_sid,200,i) })
			.catch((err) => {console.log("Faill cmrr",err);	MtoSv.Send_Rsp_MGet_Timer(_sid,err,"") })		// Fail, send error to client

}


var handle_MLogOut= function(_sid){

	for (var i = 0; i < server.LUser.length; i++) {
        if (server.LUser[i].SID== _sid)
        {
           server.LUser.splice(i,1);
           i--;
         }
      };


}


var handle_RegHome= function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {console.log("OK");	return func1.RegHome_Syntax(i)	})  
			.then((i) => {	return query.Get_UserData(i)	})	
			.then((i) => {	return query.Get_configCollection(i)	})
			.then((i) => {	return setdb.Create_Home(i)	})			
			.then((i) => {	return HtoSv.SendRsp_RegHome(_ClientID,200,i)	})				
			.catch((err) => {console.log(err);	HtoSv.SendRsp_RegHome(_ClientID,err,"") })		

}

var handle_RegNode= function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {	return func1.RegNode_Syntax(i)	})
			.then((i) => {	return query.Get_Homeinfo(i)	})
			.then((i) => {	return setdb.Create_Node(i)	})
			.then((i) => {	return HtoSv.SendRsp_RegNode(_ClientID,200,i)	})	
			.catch((err) => {console.log(err);	HtoSv.SendRsp_RegNode(_ClientID,err,"") })		

}

var handle_SetNode=function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {	return query.Get_DeviceData(i)	})   	// get device data
			.then((i) => {	return func.MSetNode_Syntax(i)	})		// check syntax
			.then((i) => {	return setdb.SetNodeStatus(i)	})		// update database
			.then((i) => {	i.userID="root"
							setdb.Create_Log_Device(i)
							SvtoM.SYNC_Mobile(i,server.LUser,"")	// send SYNC signal
							HtoSv.SendRsp_SetNode(_ClientID,200)		// send respond to client
						 })		
			.catch((err) => {HtoSv.SendRsp_SetNode(_ClientID,err) })	


}


var handle_Get=function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {	return func1.Get_Syntax(i)})
			.then((i) => {	return query.Get(i)	})
			.then((i) => {	return HtoSv.SendRsp_Get(_ClientID,200,i)	})
			.catch((err) => {console.log(err) })	


}


var handle_Login=function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {	return func1.Login_Syntax(i)})
			.then((i) => {	return query.Get_UserData(i)})  	// get user data
			.then((i) => {	 return func.Check_Password(i)})		// Check password
			.then((i) => {	return query.Login(i)})
			.then((i) => {	 HtoSv.SendRsp_Login(_ClientID,200); return query.Get(i)})
			.then((i) => {	return HtoSv.SendRsp_Get(_ClientID,200,i)	})
			.catch((err) => { HtoSv.SendRsp_Login(_ClientID,err) }) 		


}


var handle_CGet=function(_ClientID,_msg){

	func.Parse_json(_msg)
			.then((i) => {	return func1.CLogin_Syntax(i)})
			.then((i) => {	return query.Get_Home_By_Code(i)})
			.then((i) => {	return query.Get_All_Device_By_HomeID(i)})  	
			.then((i) => {	return HtoSv.SendRsp_CGet(_ClientID,200,i)	})
			.catch((err) => { HtoSv.SendRsp_CGet(_ClientID,err,null) }) 		


}


var handle_Update_Power_Value=function(_ClientID,_msg){
	console.log("LLLLLLL",server.LUser)
	func.Parse_json(_msg)
			.then((i) => {	return func1.Update_Power_Value_Syntax(i)})
			.then((i) => {	return setdb.Update_Device_Power(i)})
			.then((i) => {	return SvtoM.SYNC_Power_Mobile(i,server.LUser);})
			.then((i) => {	console.log("IIIII",i); return HtoSv.SendRsp_Update_Device_Power(_ClientID,200)	})
			.catch((err) => {console.log("cLGTTTTT",err); HtoSv.SendRsp_Update_Device_Power(_ClientID,err) }) 



}


module.exports=function(_mqttc,_io,_query,_setdb){
	query=_query
	mqttc=_mqttc
	io=_io
	setdb=_setdb
	MtoSv=require('./emit/mobile_sv.js')(io,mqttc)   // mobile to server
	SvtoM=require('./emit/sv_mobile.js')(io)	// server to mobile
	StoH=require('./emit/sv_home.js')(mqttc)		// server to home
	this.HtoSv=require('./emit/home_sv.js')(mqttc)


	return {
		handle_MLogin: handle_MLogin,
		handle_MGet: handle_MGet,
		handle_MSetNode: handle_MSetNode,
		handle_MGetNode: handle_MGetNode,
		handle_MNode: handle_MNode,
		handle_MReg: handle_MReg,
		handle_MLogOut: handle_MLogOut,
		handle_RegHome: handle_RegHome,
		handle_RegNode: handle_RegNode,
		handle_SetNode: handle_SetNode,
		handle_Get: handle_Get,
		handle_Login: handle_Login,
		handle_CGet: handle_CGet,
		handle_Update_Power_Value: handle_Update_Power_Value,
		handle_MSetTimer: handle_MSetTimer,
		handle_MGetHistory: handle_MGetHistory,
		handle_MGetTimer: handle_MGetTimer
	};


}
