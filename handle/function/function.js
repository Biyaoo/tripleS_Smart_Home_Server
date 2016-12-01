

function getdb(_in){

	 return new Promise(function(resolve, reject) {
	 	if(_in==1)
	 		return resolve(_in)
	 	return reject("Fail") 

	 });
}

var Check_json= function (text){
    try{
        JSON.parse(text);
        return true;
    }
    catch (error){
        return false;
    }
}

var Parse_json= function (_json){

 	return new Promise(function(resolve, reject) {
		if(Check_json(_json))
		{
			return resolve(JSON.parse(_json))
		}

		return reject(100)
	});

}


var Check_Password=function (_in){

	return new Promise(function(resolve, reject) {
		
		if(_in.pwd==_in.data.Password) 
			return resolve(_in)			//login completed
		return reject(410)
    });
}

var MGet_Check_Syntax=function (_in){

	return new Promise(function(resolve, reject) {
		
		if(_in.userID) 
			return resolve(_in)			// Check exist userID
		return reject(104)
    });
}



var MSetNode_Syntax=function (_in){

	return new Promise(function(resolve, reject) {
		
		if(_in.homeCode!=_in.data.HomeID) return reject(112)

		if (_in.status==_in.data.Status) return reject(201);	

		if(!(_in.status>=0 && _in.status<=2) || !_in.status) 
			return reject(100)
		return resolve(_in)
    });
}

function CheckSpecialString(string)
{
	    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
	    for(i = 0; i < specialChars.length;i++){
	        if(string.indexOf(specialChars[i]) > -1){
	            return true
	        }
	    }
	    return false
}

function MReg_CheckSyntax(_in){

	return new Promise(function(resolve, reject) {

		if(!_in.userID || !_in.pwd || _in.userID.length<4 || _in.pwd.length<4 || _in.userID.length>20 || _in.pwd.length>20) return reject(100)

		if (CheckSpecialString(_in.userID) || CheckSpecialString(_in.pwd)) return reject(100)
		return resolve(_in)


	});


}

function MSetNode_CheckUser(_in){

	return new Promise(function(resolve, reject) {

		if(_in.data.Device.indexOf(_in.nodeCode)>-1)
			return resolve(_in)
		return reject(201)


	});

}

function MLogin_GetUserInfo(_in,_sid){

	return{

		uid: _in.userID,
		SID: _sid, 
		LDevice: _in.data.Device
	}


}

function MSet_Timer_Check_Syntax(_in)	{
	return new Promise(function(resolve, reject) {

			if(!_in.userID || !_in.homeCode || !_in.nodeCode || !_in.status || !_in.time)
				return resolve(_in)
			return reject(201)


		});

}

module.exports=function(){

	return {

		MSetNode_Syntax: MSetNode_Syntax,
		Check_json: Check_json,
		Parse_json: Parse_json,
		Check_Password: Check_Password,
		MReg_CheckSyntax: MReg_CheckSyntax,
		MSetNode_CheckUser: MSetNode_CheckUser,
		MLogin_GetUserInfo: MLogin_GetUserInfo,
		MSet_Timer_Check_Syntax: MSet_Timer_Check_Syntax,
		MGet_Check_Syntax: MGet_Check_Syntax

	};


}