var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Creating routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

// creating listen port
http.listen(3080,function(){
    console.log("Listening on *:3080");
});

io.on('connection',function(socket){
    console.log("Client Connected. ID : "+socket.id);
    var userId=socket.id;

    socket.on("sendMessage",function(message){
        console.log(message);
        io.emit('receiveMessage',{id:userId,message:message});
    });

    socket.on("typing",function(){
        socket.broadcast.emit('presense');
    });
})
