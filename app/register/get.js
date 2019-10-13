const path = require("path");
const fs = require("fs");
const page = fs.readFileSync(path.join(__dirname, "source", "index.html"));

module.exports = [
  async (ctx, next) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = page;
  },
];
