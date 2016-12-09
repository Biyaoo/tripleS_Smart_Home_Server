var conn=require('./connect/connect.js')();
var app=conn.app
var io=conn.io
var http=conn.http
var mqttc=conn.mqttc

var model=require('./mongoose/model/model.js')(conn.mongoose)
var query=require('./mongoose/query/query.js')(model)
var setdb=require('./mongoose/setdb/setdb.js')(model)

var func=require('./handle/handle.js')(mqttc,io,query,setdb)


// Socket io server for Mobile client

var connection=0


io.on('connection', function(socket){


	console.log("Server has ",Object.keys(io.sockets.connected).length ," connection")
	socket.on('MLOGIN', function(msg){
		console.log(msg)
		//query.Get_UserData({"userID":"tuyen","pwd":"1234"})

		func.handle_MLogin(msg,socket.id)

	});

  socket.on('MGET', function(msg){
    console.log(msg)
    //query.Get_UserData({"userID":"tuyen","pwd":"1234"})

    func.handle_MGet(msg,socket.id)

  });


	socket.on('MSETNODE', function(msg){

		console.log(msg)
		func.handle_MSetNode(msg,socket.id)

	});

	socket.on('MGETNODE', function(msg){

		console.log(msg)
		func.handle_MGetNode(msg,socket.id)

	});

	socket.on('MNODE', function(msg){

		console.log(msg)
		func.handle_MNode(msg,socket.id)

	});

	socket.on('MREG', function(msg){

		console.log(msg)
		func.handle_MReg(msg,socket.id)

	});

  socket.on('MGETHISTORY', function(msg){

    console.log(msg)
    func.handle_MGetHistory(msg,socket.id)

  });

  socket.on('MGETTIMER', function(msg){

    console.log(msg)
    func.handle_MGetTimer(msg,socket.id)

  });

  socket.on('MSETTIMER', function(msg){

    console.log(msg)
    func.handle_MSetTimer(msg,socket.id)

  });

	socket.on('disconnect', function() {

		console.log("One client disconnect! Server has ",Object.keys(io.sockets.connected).length," connection")
		func.handle_MLogOut(socket.id)

	});

});


// Mqtt broker for Home
mqttc.on('connect', function () {

  mqttc.subscribe('#')

})



mqttc.on('message', function (topic, message) {

  console.log(topic.toString()," --  ",message.toString());

  var x=topic.indexOf("/")

  console.log(topic.substring(0,x),"---",topic.substring(x+1))

  switch(topic.substring(x+1)){

  	case "REGHOME":
  		console.log("reghome")
  		func.handle_RegHome(topic.substring(0,x),message)
  		break
  	case "REGNODE":
  		console.log("regnode")
  		func.handle_RegNode(topic.substring(0,x),message)
  		break
  	case "SETNODE":
  		console.log("setnode")
  		func.handle_SetNode(topic.substring(0,x),message)
  		break
  	case "GET":
  		console.log("GET")
  		func.handle_Get(topic.substring(0,x),message)
  		break
  	case "LOGIN":
  		console.log("LOGIN")
  		func.handle_Login(topic.substring(0,x),message)
  		break
  	case "CGET":
  		console.log("CGET")
  		func.handle_CGet(topic.substring(0,x),message)
  		break
  	case "UPDATEPOWER":
  		console.log("RUPDATEPOWER")
  		func.handle_Update_Power_Value(topic.substring(0,x),message)

  	default:
  		console.log("Fail")

  }

})
