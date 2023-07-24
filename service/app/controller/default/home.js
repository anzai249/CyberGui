'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let result = await this.app.mysql.get('questions',{});

    ctx.body = result;
  }
}

module.exports = HomeController;
