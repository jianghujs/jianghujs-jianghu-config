'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const actionDataaScheme = Object.freeze({
});

class HtmlErrorService extends Service {
  async htmlErrorLogRecord() {
   const htmlLogger = this.app.getLogger("htmlLogger");
   const { actionData } = this.ctx.request.body.appData;
   const { errorLog } = actionData;
   htmlLogger.error("[htmlError.js]", errorLog);
  }
}

module.exports = HtmlErrorService;
