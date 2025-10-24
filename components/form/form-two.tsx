"use client";

import { useField, useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";
import { countries } from "@/constants/form";
import { type FormStepTwoData, formStepTwoSchema } from "@/schemas/form";
import {
  CountrySelect,
  FieldInfo,
  FieldRow,
  FieldSet,
  FlagIcon,
  FormButton,
  Input,
  Label,
  PhoneContainer,
  PhoneInput,
} from "./fields";

const COUNTRY_CODE_REGEX = /^\+\d+\s*/;

export const FormTwo = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: FormStepTwoData;
  onSubmit: (data: FormStepTwoData) => void;
}) => {
  "use no memo";

  const form = useForm({
    validators: {
      onChange: formStepTwoSchema,
      onSubmit: formStepTwoSchema,
    },
    asyncDebounceMs: 500,
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const phoneField = useField({
    form,
    name: "phone",
  });

  // Extract country code from phone number
  const phoneValue = phoneField.state.value || "";
  // Find the first country that matches the phone code, defaulting to US
  const currentCountry =
    countries.find((country) => phoneValue.startsWith(country.phone_code)) ||
    countries[0];

  const handleCountryChange = (newCountryCode: string) => {
    const newCountry = countries.find((c) => c.phone_code === newCountryCode);
    if (newCountry) {
      // Extract just the phone number part without country code
      const currentPhoneWithoutCode = phoneValue.replace(
        COUNTRY_CODE_REGEX,
        ""
      );
      const newPhoneValue = currentPhoneWithoutCode
        ? `${newCountry.phone_code} ${currentPhoneWithoutCode}`
        : newCountry.phone_code;
      phoneField.handleChange(newPhoneValue);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    // Remove any existing formatting to get clean input
    const cleanValue = value.replace(/\D/g, "");

    // Format the phone number as (XXX) XXX-XXXX
    let formattedValue = "";
    if (cleanValue.length > 0) {
      if (cleanValue.length <= 3) {
        formattedValue = `(${cleanValue}`;
      } else if (cleanValue.length <= 6) {
        formattedValue = `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
      } else {
        formattedValue = `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`;
      }
    }

    const fullPhoneValue = `${currentCountry.phone_code} ${formattedValue}`;
    phoneField.handleChange(fullPhoneValue);

    // Calculate the new cursor position
    setTimeout(() => {
      const input = e.target;
      let newCursorPosition = cursorPosition;

      // Adjust cursor position based on formatting characters
      const beforeCursor = value.slice(0, cursorPosition);
      const cleanBeforeCursor = beforeCursor.replace(/\D/g, "");

      // Count formatting characters that should be before the cursor in the new value
      let formattedBeforeCursor = "";
      if (cleanBeforeCursor.length > 0) {
        if (cleanBeforeCursor.length <= 3) {
          formattedBeforeCursor = `(${cleanBeforeCursor}`;
        } else if (cleanBeforeCursor.length <= 6) {
          formattedBeforeCursor = `(${cleanBeforeCursor.slice(0, 3)}) ${cleanBeforeCursor.slice(3)}`;
        } else {
          formattedBeforeCursor = `(${cleanBeforeCursor.slice(0, 3)}) ${cleanBeforeCursor.slice(3, 6)}-${cleanBeforeCursor.slice(6)}`;
        }
      }

      newCursorPosition = formattedBeforeCursor.length;
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const lastName = useField({
    form,
    name: "lastName",
  });

  const phoneNumberOnly = phoneValue.replace(COUNTRY_CODE_REGEX, "").trim();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="firstName">
        {(field) => (
          <>
            <Label htmlFor={field.name}>Name</Label>
            <FieldRow>
              <FieldSet>
                <Input
                  autoComplete="given-name"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="First name"
                  value={field.state.value}
                />
              </FieldSet>
              <form.Field name="lastName">
                {(lastNameField) => (
                  <FieldSet>
                    <Input
                      autoComplete="family-name"
                      id={lastNameField.name}
                      name={lastNameField.name}
                      onBlur={lastNameField.handleBlur}
                      onChange={(e) =>
                        lastNameField.handleChange(e.target.value)
                      }
                      placeholder="Last name"
                      value={lastNameField.state.value}
                    />
                  </FieldSet>
                )}
              </form.Field>
            </FieldRow>
            <div style={{ marginTop: "0.5rem" }}>
              <FieldInfo field={field} />
              <FieldInfo field={lastName} />
            </div>
          </>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <FieldSet>
            <Label htmlFor={field.name}>Email</Label>
            <Input
              autoComplete="email"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your email"
              type="email"
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>

      <form.Field name="phone">
        {(field) => (
          <FieldSet>
            <Label htmlFor={field.name}>Phone</Label>
            <PhoneContainer>
              <CountrySelect>
                <FlagIcon
                  alt={`${currentCountry.name} flag`}
                  src={currentCountry.flag_url}
                />
                <select
                  onChange={(e) => handleCountryChange(e.target.value)}
                  value={currentCountry.phone_code}
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.phone_code}>
                      {country.phone_code}
                    </option>
                  ))}
                </select>
              </CountrySelect>
              <PhoneInput
                autoComplete="tel"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={handlePhoneNumberChange}
                placeholder="(555) 000-0000"
                type="tel"
                value={phoneNumberOnly}
              />
            </PhoneContainer>
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>

      <form.Subscribe>
        {(state) => (
          <FormButton disabled={state.isSubmitting} type="submit">
            Continue
            <ArrowRight width={16} />
          </FormButton>
        )}
      </form.Subscribe>
    </form>
  );
};
