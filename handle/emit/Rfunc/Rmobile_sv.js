
var return_MLogin=function (_rcode){

	return {
		title: "@RMLOGIN",
		rcode: _rcode

	};

}

var return_MSetNode=function (_rcode)
{
  return {
            title: "@RMSETNODE",
            rcode: _rcode,
        };
}

var return_MGetNode=function (_rcode,_Ldevice)
{
	var ret={
            title: "@RMSETNODE",
            rcode: _rcode,
           
        };


  	if (_rcode==200) ret.device=_Ldevice
  	return ret
}


var return_MNode=function (_rcode,_dev)
{
	
	if (_rcode==200) 
 		 return {
            title: "@RMNODE",
            rcode: _rcode,
            nodeCode: _dev["DID"],
		    nodeName: _dev["DName"],
		    homeCode: _dev["HomeID"],
		    Room: _dev["Rom"],
		    status: _dev["Status"],
		    current: _dev["Current"],
            
        };
    return{
            title: "@RMNODE",
            rcode: _rcode
    };
}


var return_MReg=function (_rcode){

	return {
            title: "@RMREG",
            rcode: _rcode
        };


}

var return_MGet=function (_rcode,_data){

	var ret= {
            title: "@RMGET",
            rcode: _rcode
        };

    if(_data)	{
    	ret.home=_data.home
    	ret.device=_data.data.Device
    }


    return ret

}

var return_MSet_Timer=function(_rcode)	{

	return {
            title: "@RMSETTIMER",
            rcode: _rcode
        };


}

var return_MGet_Device_History=function(_rcode,_data)  {
    var ret={
            title: "@RMGETHISTORY",
            rcode: _rcode
        };

    if(_rcode==200)   {
        ret.Ldevice= _data.LDevice
    }

    return ret

}

var return_MGet_Timer=function(_rcode,_data)  {

    var ret={
            title: "@RMGETTIMER",
            rcode: _rcode
        };

    if(_rcode==200)   {
        ret.LTimer= _data.LTimer
    }
    console.log("REEEEE",ret)
    return ret


}

module.exports=function(){

	return {

		return_MLogin: return_MLogin,
		return_MSetNode: return_MSetNode,
		return_MGetNode: return_MGetNode,
		return_MNode: return_MNode,
		return_MReg: return_MReg,
		return_MSet_Timer: return_MSet_Timer,
		return_MGet: return_MGet,
        return_MGet_Device_History: return_MGet_Device_History,
        return_MGet_Timer: return_MGet_Timer

	};


}


