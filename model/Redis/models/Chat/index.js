module.exports = class Chat {
  constructor(redis) {
    this.redis = redis;
  }

  async create({ id, username, msg }) {
    const now = Date.now();
    const random = ~~(Math.random() * 1000);
    const chat = {
      id,
      username,
      msg,
      time: now,
    }

    await this.redis.set(
      `chat:${now}-${random}`, JSON.stringify(chat),
      'EX', 600
    );

    return chat;
  }

  async selectAll() {
    const keys = await this.redis.keys('*');
    let rows = keys.map(async key => {
      let datum = await this.redis.get(key);
      datum = JSON.parse(datum);
      return datum;
    });
    rows = await Promise.all(rows);
    rows.sort((a, b) => a.time - b.time);
    return rows;
  }
}