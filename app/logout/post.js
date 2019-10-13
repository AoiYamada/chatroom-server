module.exports = [
  async (ctx, next) => {
    ctx.logout();
    ctx.redirect('/login');
  }
]