import { z } from "zod/v4";
import { companyStates, companyTypes, countries } from "../constants/form";

const stateAbbreviations = companyStates.map((state) => state.abbreviation);
const phoneCodes = countries.map((country) => country.phone_code);

export const formStepOneSchema = z.object({
  name: z.string().min(2, "Company name should be at least 2 characters long"),
  type: z.enum(companyTypes, {
    error: "Please choose a company type from the list",
  }),
  address: z.object({
    line1: z
      .string()
      .min(5, "Street address seems a bit short - please add more details"),
    line2: z.string().optional(),
    city: z.string().min(2, "City name looks incomplete"),
    state: z.enum(stateAbbreviations, {
      error: "Please select your state from the dropdown",
    }),
    zip: z.string().length(5, "ZIP code must be exactly 5 digits"),
  }),
});

export const formStepTwoSchema = z.object({
  firstName: z.string().min(2, "First name should be at least 2 characters"),
  lastName: z.string().min(2, "Last name should be at least 2 characters"),
  email: z.email("Make sure your email is a well formed address"),
  phone: z
    .string()
    .regex(
      new RegExp(
        `^(${phoneCodes.join("|").replace(/\+/g, "\\+")}) \\(\\d{3}\\) \\d{3}-\\d{4}$`
      ),
      "Phone format should be: +1 (555) 123-4567"
    ),
});

export const completeFormSchema = formStepOneSchema.extend(
  formStepTwoSchema.shape
);

export type FormData = z.output<typeof completeFormSchema>;
export type FormStepOneData = z.output<typeof formStepOneSchema>;
export type FormStepTwoData = z.output<typeof formStepTwoSchema>;
