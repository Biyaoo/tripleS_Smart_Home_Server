
var return_SYNC=function (_dev){

	return {
	    title: "@SYNC",
	    homeCode: _dev.homeCode,
	    nodeCode: _dev.nodeCode,
	    status: _dev.status
    }

}

var return_SYNC_Power=function (_dev){

	return {
	    title: "@SYNCPOWNER",
	    homeCode: _dev.homeCode,
	    nodeCode: _dev.nodeCode,
	    status: _dev.status
    }

}



module.exports=function(){

	return {

		return_SYNC: return_SYNC,
		return_SYNC_Power: return_SYNC_Power
	};


}


