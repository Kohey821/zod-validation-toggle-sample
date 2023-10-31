import { z } from "zod";

export const radioSchema = z
  .string()
  .nullable()
  .optional()
  .refine((v) => typeof v === "string", { message: "選択してください。" });

export const checkboxSchema = z
  .union([z.string().array(), z.boolean()])
  .optional()
  .transform((v) => (typeof v === "boolean" ? [] : v))
  .optional();

export const productSchema = ({ onlyName }: { onlyName: boolean }) =>
  z.object({
    name: radioSchema,
    ...(onlyName
      ? {}
      : {
          option1: radioSchema,
          option2: checkboxSchema,
        }),
  });

export type Product = z.infer<ReturnType<typeof productSchema>>;

export const myFormSchema = ({ onlyName }: { onlyName: boolean }) =>
  z.object({
    ramen: productSchema({ onlyName }),
  });

export type MyForm = z.infer<ReturnType<typeof myFormSchema>>;
