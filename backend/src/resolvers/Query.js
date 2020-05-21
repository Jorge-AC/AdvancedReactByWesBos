const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

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
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null
    }

    return ctx.db.query.user({
      where: {
        id: ctx.request.userId
      }
    }, info)
  },
  async usersPermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to perform this action');
    }

    //Check if user has enough permission to update permissions. If not, error will be thrown:
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    const users = await ctx.db.query.users({}, info);

    return users;
  },
  async singleOrder(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('You must be logged in to perform this action');

    const order = await ctx.db.query.order({
      where: { id: args.id }
    }, info).catch(err => { throw new Error(err) });

    const isOwner = order.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.includes('ADMIN');

    if (!isOwner && !hasPermissions) throw new Error('You can\'t perform this action');

    return order
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) throw new Error('You must be logged in to see your orders');

    return ctx.db.query.orders({
      where: { user: { id: userId } },
      orderBy: args.orderBy
    }, info)
  }
};

module.exports = Query;
