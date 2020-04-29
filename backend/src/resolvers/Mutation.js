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
  }
};

module.exports = mutations;
