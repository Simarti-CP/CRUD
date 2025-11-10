const { z } = require("zod");

const postSchemas = z.object({
  userId: z.coerce.number(),
  title: z.string().max(80),
  body: z.string().max(150)
});

const postUpdation = z.object({
  title: z.string().max(80),
  body: z.string().max(150)
});

module.exports = { postSchemas, postUpdation };


