const path = require("path");
const {
  PATHS: { LIB, MODEL },
} = require("config");
const {
  Redis: { Chat },
} = require(MODEL);
const { io } = require(path.join(LIB, "Server"));

io.on("connection", async (socket) => {
  console.log(`${socket.id} connected`);
  // let {  } = socket.handshake.query;

  // https://stackoverflow.com/questions/13095418/how-to-use-passport-with-express-and-socket-io
  const user = socket.session.passport.user;
  console.log("user:", user);

  const all_chat = await Chat.selectAll();
  socket.emit("init", all_chat);

  socket.on("broadcast", async msg => {
    let chat = {
      ...user,
      msg,
    }
    chat = await Chat.create(chat);
    io.emit("broadcast", chat);
  });

  socket.on("disconnect", _ => {
    console.log(`${socket.id} disconnected`)
  })
});