import { z } from "zod";

export const radioSchema = z
  .string()
  .nullish() // NOTE: requiredエラーはrefineで表現するため
  .refine((v) => typeof v === "string", { message: "選択してください。" });

export const checkboxSchema = z
  .union([z.string().array(), z.boolean()])
  .optional() // NOTE: requiredエラーはrefineで表現するため
  .transform((v) => (typeof v === "boolean" ? [] : v));

export const productSchema = ({ onlyName }: { onlyName: boolean }) =>
  z.object({
    name: radioSchema,

    // FIXME: これをすると型が壊れる
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
