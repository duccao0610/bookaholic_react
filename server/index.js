const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const router = require("./api");
const mongoose = require("mongoose");
const User = require("./models/User");
const {
  setOnline,
  getReceiverSocketId,
  setOffline,
} = require("./services/onlineStatus");
const {
  updatePendingFriendReq,
  acceptFriendReq,
  declineFriendReq,
} = require("./services/friendRequest");

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
  let user;
  socket.on("setOnline", async (username) => {
    user = username;
    await setOnline(username, socket.id);
  });

  socket.on(
    "sendFriendReq",
    async (senderUsername, receiverUsername, senderId) => {
      updatePendingFriendReq(senderUsername, receiverUsername, senderId);
      const receiverSocketId = await getReceiverSocketId(receiverUsername);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "receiveFriendReq",
          senderUsername,
          receiverUsername
        );
        io.to(receiverSocketId).emit("updateIfInProfilePage");
      }
    }
  );

  socket.on("acceptFriendReq", async (senderId, receiverId, requestId) => {
    acceptFriendReq(senderId, receiverId, requestId);
    const sender = await User.findOne({ _id: senderId });
    if (sender.onlineStatus.isOnline) {
      io.to(sender.onlineStatus.socketId).emit("acceptFriendReq", senderId);
    }
  });

  socket.on("declineFriendReq", async (senderUsername, receiverUsername) => {
    declineFriendReq(senderUsername, receiverUsername);
    const sender = await User.findOne({ username: senderUsername });
    if (sender.onlineStatus.isOnline) {
      io.to(sender.onlineStatus.socketId).emit(
        "declineFriendReq",
        senderUsername
      );
    }
  });

  socket.on("disconnect", async () => {
    await setOffline(user);
    console.log("An user disconnected");
  });
});

//Connect MongoDB
const CONNECTION_URL =
  "mongodb+srv://duccao0610:duccao0610@cluster0.0etmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", true);
