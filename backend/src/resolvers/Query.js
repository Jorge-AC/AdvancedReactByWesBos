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
  }
};

module.exports = Query;
