const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("<h2>Chat Server Ready!!</h2>");
});

let users = {};
let totalUsers = 0;

io.on("connection", socket => {
  ++totalUsers;

  const clientID = socket.id;
  const newUser = {
    clientID,
    nickName: `Guest ${totalUsers}`
  };
  users[clientID] = newUser;
  console.log("a user connected " + clientID);

  sendServerMessage(
    io,
    0,
    "server message",
    `${newUser.nickName} joined chat room`,
    newUser
  );

  socket.on("change nickname", message => {
    console.log(clientID + " " + message);
    const oldName = users[clientID].nickName;
    users[clientID].nickName = message;
    sendServerMessage(
      io,
      0,
      "server message",
      `${oldName} changed nick name to ${message}`,
      users[clientID]
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    console.log("message: " + msg);
    sendServerMessage(io, 1, "chat message", msg, users[clientID]);
  });
});

const sendServerMessage = (socket, type, message, content, user) => {
  const body = {
    date: Date.now(),
    type,
    message,
    content,
    user
  };
  socket.emit(message, body);
};

http.listen(9000, () => {
  console.log("listening on *:9000");
});
