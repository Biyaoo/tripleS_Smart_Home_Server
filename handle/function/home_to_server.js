

var Check_json= function (_in){
    try{
        JSON.parse(_in);
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

var RegHome_Syntax= function(_json){		// Check Syntax

	return new Promise(function(resolve, reject) {

		if( !_json.userID )	return reject(100)		// Incorrect format

		return resolve(_json)

	});

}

var RegNode_Syntax=function(_json){


	return new Promise(function(resolve, reject) {

		if( !_json.homeCode || !_json.code )	return reject(100)		// Incorrect format

		return resolve(_json)

	});


}

var Get_Syntax=function(_json){

	return new Promise(function(resolve, reject) {

		if( !_json.homeCode )	return reject(100)		// Incorrect format

		return resolve(_json)

	});



}

var Login_Syntax=function(_json){

	return new Promise(function(resolve, reject) {

		if( !_json.userID || !_json.code || !_json.pwd)	return reject(100)		// Incorrect format

		return resolve(_json)

	});	



}

var CLogin_Syntax=function(_json){

	return new Promise(function(resolve, reject) {

		if( !_json.code)	return reject(100)		// Incorrect format

		return resolve(_json)

	});	


}

var Update_Power_Value_Syntax=function(_json){

	return new Promise(function(resolve, reject) {

		if( !_json.nodeCode || !_json.homeCode || !_json.power)	return reject(100)		// Incorrect format

		return resolve(_json)

	});	



}

module.exports=function(){

	return {

		Check_json: Check_json,
		Parse_json: Parse_json,
		RegHome_Syntax: RegHome_Syntax,
		RegNode_Syntax: RegNode_Syntax,
		Get_Syntax: Get_Syntax,
		Login_Syntax: Login_Syntax,
		CLogin_Syntax: CLogin_Syntax,
		Update_Power_Value_Syntax: Update_Power_Value_Syntax

	};


}