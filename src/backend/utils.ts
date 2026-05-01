import { Context, Next } from "hono";
import { treeifyError, ZodType } from "zod";

export const validateBody =
  (schema: ZodType) => async (c: Context, next: Next) => {
    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return c.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: treeifyError(result.error),
          },
        },
        400,
      );
    }

    c.set("validatedBody", result.data);

    await next();
  };
