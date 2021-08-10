const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const router = require("./api");
const mongoose = require("mongoose");
const {
  setOnline,
  getReceiverSocketId,
  setOffline,
} = require("./services/onlineStatus");
const {
  updatePendingFriendReq,
  acceptFriendReq,
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

  socket.on("acceptFriendReq", (senderId, receiverId, requestId) => {
    acceptFriendReq(senderId, receiverId, requestId);
  });

  socket.on("disconnect", async () => {
    await setOffline(user);
    console.log("An user disconnected");
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
