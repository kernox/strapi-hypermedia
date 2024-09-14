'use strict';

module.exports = ({ strapi }) => ({

  index(ctx) {
    ctx.body = strapi
      .plugin('hypermedia')
      .service('myService')
      .getWelcomeMessage();
  },
});
