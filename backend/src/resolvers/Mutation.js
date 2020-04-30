const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mutations = {
  /*
  createItem: async function(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    });

    return item;
  },
  */
  //OR ANY OF BOTH WORKS THE SAME
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },

  async updateItem(parent, args, ctx, info) {
    let data = { ... args};

    delete data.id

    const item = await ctx.db.mutation.updateItem({
      data: data,
      where: {
        id: args.id
      }
    }, info);

    return item
  },

  async deleteItem(parent, args, ctx, info){
    const whereId = {where: {id: args.id}};
    const item = await ctx.db.query.item(whereId, `{id, title}`);
    //TODO check user's ownership or permissions to delete item

    const deleted = await ctx.db.mutation.deleteItem(whereId, info);

    return deleted;
  },

  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER']}
      }
    }, info);

    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET );

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    });

    return user
  }
};

module.exports = mutations;
