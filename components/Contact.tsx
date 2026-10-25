"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/app/actions/contact";
import Container from "@/components/Container";
import Input from "@/components/Input";
import SectionHeading from "@/components/SectionHeading";
import { contactSchema, type ContactMessage } from "@/lib/contact";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessage>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactMessage) => {
    try {
      await sendContactMessage(values);
      setSent(true);
    } catch {
      setError("root", { message: "Something went wrong. Try again." });
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-line bg-[#12161c99]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative py-16 sm:py-24">
        <SectionHeading
          eyebrow="Contact"
          title="Say hello"
          description="A project, a role, or a question."
        />

        {sent ? (
          <p className="mt-12 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
            Thanks. I’ll get back to you.
          </p>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 grid gap-8 sm:grid-cols-2"
          >
            <Input
              label="Name"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <div className="sm:col-span-2">
              <Input
                label="Message"
                multiline
                error={errors.message?.message}
                {...register("message")}
              />
            </div>
            {errors.root ? (
              <p className="text-sm text-red-300 sm:col-span-2">
                {errors.root.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-[#0c0e12] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-50"
            >
              {isSubmitting ? "Sending" : "Send"}
            </button>
          </form>
        )}
      </Container>
    </section>
  );
};

export default Contact;
