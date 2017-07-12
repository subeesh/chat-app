var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.send("<h2>Chat Server Ready!!</h2>");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

http.listen(9000, function() {
  console.log("listening on *:9000");
});
