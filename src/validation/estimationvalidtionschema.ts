import * as z from "zod";

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.number().min(0),
  price: z.number().min(0),
  margin: z.number().min(0).max(100),
});

export const sectionSchema = z.object({
  sectionName: z.string().min(1, "Section name is required"),
  items: z.array(itemSchema).min(1),
});

export const estimationSchema = z.object({
  sections: z.array(sectionSchema).min(1),
});

export type EstimationFormData = z.infer<typeof estimationSchema>;
