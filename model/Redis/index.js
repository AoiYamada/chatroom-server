const redis = require("./redis");
const Chat = require("./models/Chat");

const ChatInst = new Chat(redis);

module.exports = {
  Chat: ChatInst,
}