'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '默认api接口测试';
  }
}

module.exports = HomeController;
