import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/data/contactForm";

describe("Form Validation Schemas", () => {
  it("validates contactFormSchema correctly", () => {
    const invalidData = {
      role: "",
      firstName: "",
      lastName: "",
      email: "invalid-email",
      country: "",
      city: "",
      termsAccepted: false,
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    const validData = {
      role: "Business Owner",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@sungrow.com",
      country: "India",
      city: "Mumbai",
      termsAccepted: true,
      newsletter: true,
    };

    const validResult = contactFormSchema.safeParse(validData);
    expect(validResult.success).toBe(true);
  });
});
