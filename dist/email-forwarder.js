// src/email-forwarder.ts
var email_forwarder_default = {
  async email(message, env, ctx) {
    await message.forward("canaaninthotel@gmail.com");
  }
};
export {
  email_forwarder_default as default
};
//# sourceMappingURL=email-forwarder.js.map
