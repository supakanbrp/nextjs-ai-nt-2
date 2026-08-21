"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";

import { contactSchema, type ContactFormValues } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type FormStatus = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("pending");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
        errors?: Record<string, string[] | undefined>;
      } | null;

      if (!response.ok) {
        const hasFieldErrors = !!data?.errors;
        if (data?.errors) {
          form.clearErrors();
          Object.entries(data.errors).forEach(([key, message]) => {
            const msg = Array.isArray(message) ? message[0] : message;
            if (msg) {
              form.setError(key as keyof ContactFormValues, {
                type: "server",
                message: msg,
              });
            }
          });
        }
        setStatus("error");
        setSubmitError(
          hasFieldErrors
            ? null
            : data?.message ?? "Failed to send message. Please try again"
        );
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setSubmitError("Failed to send message. Please try again");
    }
  }

  const isPending = status === "pending";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-name">Name *</FieldLabel>
              <Input
                {...field}
                id="contact-name"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
                autoComplete="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-email">Email *</FieldLabel>
              <Input
                {...field}
                id="contact-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-subject">Subject *</FieldLabel>
              <Input
                {...field}
                id="contact-subject"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Course inquiry"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">Message *</FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                rows={6}
                aria-invalid={fieldState.invalid}
                placeholder="Type your message here..."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Honeypot: hidden from users, catches bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            {...form.register("website")}
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Spinner /> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </FieldGroup>

      <div aria-live="polite" className="mt-4">
        {status === "success" && (
          <p
            role="status"
            className="rounded-xl bg-primary/10 p-3 text-sm text-primary"
          >
            Message sent successfully. We will get back to you as soon as possible
          </p>
        )}

        {status === "error" && submitError && (
          <p
            role="alert"
            className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
          >
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}