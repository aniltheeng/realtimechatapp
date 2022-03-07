const io = require("socket.io")(8000);

let users = {};
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    socket.emit('you-joined',{name:users[socket.id],message:'joined'})
  });

  socket.on("send-chatMessage", (message) => {
    socket.broadcast.emit("send-Message", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on('disconnected',()=>{
      socket.broadcast.emit('user-disconnected',users[socket.id])
      delete users[socket.id]
  })
});
