const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const router = require("./api");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json({ limit: "5MB" }));
app.use(router);

io.on("connection", (socket) => {
  console.log("An user connected");
  socket.on("hello", (data) => {
    console.log(data);
    socket.emit("setCurrentUser");
  });
  socket.on("updateProfile", (data) => {
    console.log(data);
    socket.emit("updateCurrentUser");
  });
  socket.on("updateAvatar", (data) => {
    console.log(data);
    socket.emit("updateCurrentUser");
  });
  socket.on("sendFriendRequest", (data) => {
    socket.broadcast.emit("receiveFriendRequest", data);
  });
});

//Connect MongoDB
const CONNECTION_URL =
  "mongodb+srv://duccao0610:duccao0610@cluster0.0etmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", true);
