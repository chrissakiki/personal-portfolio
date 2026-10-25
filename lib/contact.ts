import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().pipe(z.email("Enter a valid email")),
  message: z.string().trim().min(1, "Message is required"),
});

export type ContactMessage = z.infer<typeof contactSchema>;
