const { forwardTo } = require('prisma-binding');

const Query = {
/*
  async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items();

    return items;
  },
*/
//OR. Both works the same
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me: (parent, args, ctx, info) => {
    if(!ctx.request.userId) {
      return null
    }

    return ctx.db.query.user({
      where: {
        id: ctx.request.userId
      }
    }, info)
  }
};

module.exports = Query;
