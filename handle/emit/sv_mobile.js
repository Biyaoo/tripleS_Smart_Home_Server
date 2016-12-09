var SM=require('./Rfunc/Rsv_mobile.js')()   // server to mobile
var io

function Sendby_socketid(_sid,_topic,_msg){

	io.sockets.connected[_sid].emit(_topic,JSON.stringify(_msg))

}

function SYNC_Mobile(_dev,_LUser,_sid){
/*	console.log("SYNC_Mobileeee:",_LUser)
	console.log("devvvvv",_dev) */

	_LUser.forEach(function(_item){

    if(_item.LHome.indexOf(_dev.homeCode)>-1 && (_item.SID!= _sid))
        
      	Sendby_socketid(_item.SID,"SYNC",SM.return_SYNC(_dev))
  		console.log("SYNC",SM.return_SYNC(_dev))
  	});

}

function SYNC_Power_Mobile(_dev,_LUser)	{
	return new Promise(function(resolve, reject) {
		console.log(_dev)

		_LUser.forEach(function(_item){

	    if(_item.LHome.indexOf(_dev.homeCode)>-1 )
	        
	      	Sendby_socketid(_item.SID,"SYNCPOWER",SM.return_SYNC_Power(_dev))
	  		console.log("SYNCPOWER",SM.return_SYNC_Power(_dev))
	  	});

	  	return resolve(_dev)

	});


}

module.exports=function (_io){

	io=_io
	
	return {
		SYNC_Mobile: SYNC_Mobile,
		SYNC_Power_Mobile: SYNC_Power_Mobile
	};


}
