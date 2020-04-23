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
    });

    return item;
  }

};

module.exports = mutations;
