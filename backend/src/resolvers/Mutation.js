const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const { transport, mailTemplate } = require('../sendEmail');
const { hasPermission } = require('../utils');

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
    if (!ctx.request.userId) throw new Error('You must be logged in to create an Item');

    const item = await ctx.db.mutation.createItem({
      data: {
        user: {
          connect: {
            id: ctx.request.userId
          }
        },
        ...args
      }
    }, info);

    return item;
  },

  async updateItem(parent, args, ctx, info) {
    let data = { ...args };

    delete data.id

    const item = await ctx.db.mutation.updateItem({
      data: data,
      where: {
        id: args.id
      }
    }, info);

    return item
  },

  async deleteItem(parent, args, ctx, info) {
    const whereId = { where: { id: args.id } };
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
        permissions: { set: ['USER'] }
      }
    }, info);

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    });

    return user
  },

  async signIn(parent, args, ctx, info) {
    const user = await ctx.db.query.user({
      where: {
        email: args.email
      }
    }, info);

    if (!user) throw Error(`No user found for email ${ args.email }`);

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw Error`Incorrect user's password`;

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    });

    return user
  },

  async signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token');

    return null;
  },

  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({
      where: {
        email: args.email
      }
    });

    if (!user) throw new Error(`No user found for email ${ args.email }`);

    const cryptoPromisified = promisify(crypto.randomBytes);
    const resetToken = (await cryptoPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    await ctx.db.mutation.updateUser({
      data: {
        resetToken,
        resetTokenExpiry
      },
      where: {
        email: args.email
      }
    })

    //send email to user

    const mail = await transport.sendMail({
      from: '"George" <jardila@qarbono.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Reset your password ✔", // Subject line
      html: mailTemplate(resetToken) // html body
    })

    return { message: 'Successfully created the resetToken' };
  },

  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) throw new Error('Passwords do not match');

    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });

    if (!user) throw new Error('Invalid Token or time exceded');

    const password = await bcrypt.hash(args.password, 10);

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    })

    return updatedUser
  },

  async updatePermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('You must be logged in to perform this action');

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { id: args.userId },
      data: {
        permissions: {
          set: args.permissions
        }
      }
    }, info);

    return updatedUser;
  }
};

module.exports = mutations;
