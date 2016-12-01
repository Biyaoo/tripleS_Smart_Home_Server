
var return_Control=function (_data){

	return {
		title: "@CONTROL",
		homeCode: _data.homeCode,
		nodeCode: _data.nodeCode,
		code: _data.code,
		status: _data.status

	};

}




module.exports=function(){

	return {

		return_Control: return_Control
	};


}


