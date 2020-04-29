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
  }
};

module.exports = mutations;
