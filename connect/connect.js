var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);


mongoose.connect('mongodb://localhost:27017/quanlynha',function(err){
	if(err) console.log(err)
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var mqtt = require('mqtt');

var options = {
  port: 1883,
  clientId: "tripleS_nodejs_client",
  username: "tripleS",
  password: "triples132",
};

var mqttclient = mqtt.connect('mqtt://trantuyen.name.vn:1883');



module.exports=function ()
{

	var conn={

		app: app,
		http: http,
		io: io,
		mongoose: mongoose,
		mqttc: mqttclient

	};

	return conn;

}