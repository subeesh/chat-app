const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("<h2>Chat Server Ready!!</h2>");
});

let users = {};
let totalUsers = 0;
let totalMessages = 0;

io.on("connection", socket => {
  ++totalUsers;

  const clientID = socket.id;
  const newUser = {
    clientID,
    nickName: `Guest ${totalUsers}`
  };
  users[clientID] = newUser;
  console.log("a user connected " + clientID);

  sendFeed(io, `${newUser.nickName} joined chat room`);

  sendServerMessage(
    io,
    0,
    "server message",
    `${newUser.nickName} joined chat room`,
    newUser
  );
  sendDashboardInfo(io);
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
    sendFeed(io, `${oldName} changed nick name to ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    --totalUsers;
    sendDashboardInfo(io);
    sendFeed(io, `${users[clientID].nickName} left the room`);
  });

  socket.on("chat message", msg => {
    console.log("message: " + msg);
    ++totalMessages;
    sendServerMessage(io, 1, "chat message", msg, users[clientID]);
    sendDashboardInfo(io);
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

const sendDashboardInfo = socket => {
  socket.emit("info", { totalUsers, totalMessages });
};

const sendFeed = (socket, message) => {
  socket.emit("feed", {
    date: Date.now(),
    message
  });
};

http.listen(9000, () => {
  console.log("listening on *:9000");
});
