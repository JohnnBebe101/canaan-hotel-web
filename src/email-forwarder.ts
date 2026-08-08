export default {
  async email(message: EmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
    // Forward the original message preserving headers, body, attachments, etc.
    await message.forward("canaaninthotel@gmail.com");
  },
};