import { ZodFirstPartyTypeKind as Kind, ZodOptional, ZodTypeAny } from "zod";
export const normalizeZodObject = (shape: Record<string, ZodTypeAny>) => {
  const typeNameMap: Record<string, string> = {
    [Kind.ZodString]: "string",
    [Kind.ZodNumber]: "number",
    [Kind.ZodBoolean]: "boolean",
    [Kind.ZodDate]: "Date",
  };

  return Object.entries(shape).reduce<Record<string, string>>(
    (acc, [key, zodType]) => {
      const typeName =
        zodType instanceof ZodOptional
          ? zodType._def.innerType._def.typeName
          : zodType._def.typeName;
      acc[key] = typeNameMap[typeName] ?? "unknown";
      return acc;
    },
    {},
  );
};
