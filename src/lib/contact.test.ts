import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact";

const validInput = {
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  subject: "สอบถามหลักสูตร",
  message: "สวัสดีครับ ผมสนใจเรียนหลักสูตรนี้มากครับ",
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "ก" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("name");
    }
  });

  it("rejects name longer than 100 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "ก".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("email");
    }
  });

  it("rejects subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "ab" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("subject");
    }
  });

  it("rejects subject longer than 150 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "ก".repeat(151),
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "สั้นไป" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("message");
    }
  });

  it("rejects message longer than 2000 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: "ก".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("allows empty honeypot website field", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      website: "",
    });
    expect(result.success).toBe(true);
  });
});