
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
	    title: "@SYNCPOWER",
	    homeCode: _dev.homeCode,
	    nodeCode: _dev.nodeCode,
	    power: _dev.cpower
    }

}



module.exports=function(){

	return {

		return_SYNC: return_SYNC,
		return_SYNC_Power: return_SYNC_Power
	};


}


