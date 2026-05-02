import { Context, Next } from "hono";
import { treeifyError, ZodType } from "zod";

export const validateBody =
  (schema: ZodType) => async (c: Context, next: Next) => {
    let body: unknown;

    try {
      body = await c.req.json();
    } catch (error) {
      return c.json(
        {
          success: false,
          error: {
            code: "INVALID_JSON",
            message: "Request body must be valid JSON",
            details: error instanceof Error ? error.message : String(error),
          },
        },
        400,
      );
    }
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

export const validateParams =
  (schema: ZodType) => async (c: Context, next: Next) => {
    const rawParams = c.req.param();

    const result = schema.safeParse(rawParams);

    if (!result.success) {
      return c.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid URL parameters",
            details: treeifyError(result.error),
          },
        },
        400,
      );
    }

    c.set("validatedParams", result.data);

    await next();
  };
