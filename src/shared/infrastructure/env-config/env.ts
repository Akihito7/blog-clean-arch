import { ConfigError } from "src/shared/domain/errors/config-error";
import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
});

export type envSchemaType = z.infer<typeof envSchema>

export const envConfiguration = () => {

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new ConfigError(
      `Invalid application configuration: ${result.error.message}`,
    );
  }

  return result.data
}