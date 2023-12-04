import { RequiredValidatorSpec, cleanEnv } from "envalid";

export function validateEnv<
  T extends Record<string, RequiredValidatorSpec<string>>
>(schema: T) {
  const message = "Env is not configured";
  let hasError = false;
  const env = cleanEnv(process.env, schema, {
    reporter: ({ errors }) => {
      hasError = Object.keys(errors).length > 0;
      if (hasError) console.error({ message, errors });
    },
  });
  return hasError ? new Error(message) : env;
}
