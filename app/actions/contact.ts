"use server";

import { contactSchema, type ContactMessage } from "@/lib/contact";

export const sendContactMessage = async (input: ContactMessage) => {
  contactSchema.parse(input);

  // Nodemailer will send the parsed message from here.
  return { ok: true as const };
};
