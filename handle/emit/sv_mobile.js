var SM=require('./Rfunc/Rsv_mobile.js')()   // server to mobile
var io

function Sendby_socketid(_sid,_topic,_msg){

	io.sockets.connected[_sid].emit(_topic,JSON.stringify(_msg))

}

function SYNC_Mobile(_dev,_LUser,_sid){

	_LUser.forEach(function(_item){

    if(_item.LDevice.indexOf(_dev.nodeCode)>-1 && (_item.SID!= _sid))
        
      	Sendby_socketid(_item.SID,"SYNC",SM.return_SYNC(_dev))
  		console.log("SYNC",SM.return_SYNC(_dev))
  	});

}

function SYNC_Power_Mobile(_dev,_LUser)	{

	_LUser.forEach(function(_item){

    if(_item.LDevice.indexOf(_dev.nodeCode)>-1)
        
     	Sendby_socketid(_item.SID,"SYNC",SM.return_SYNC(_dev))
  		console.log("SYNC Power",SM.return_SYNC(_dev))
  	});


}

module.exports=function (_io){

	io=_io
	
	return {
		SYNC_Mobile: SYNC_Mobile,
		SYNC_Power_Mobile: SYNC_Power_Mobile
	};


}
