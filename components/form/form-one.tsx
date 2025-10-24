"use client";

import { useField, useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";
import { companyStates, companyTypes } from "@/constants/form";
import { type FormStepOneData, formStepOneSchema } from "@/schemas/form";
import {
  FieldInfo,
  FieldSet,
  FormButton,
  Input,
  Label,
  Select,
} from "./fields";

export const FormOne = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: FormStepOneData;
  onSubmit: (data: FormStepOneData) => void;
}) => {
  "use no memo";

  const form = useForm({
    validators: {
      onChange: formStepOneSchema,
      onSubmit: formStepOneSchema,
    },
    asyncDebounceMs: 500,
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  const zipField = useField({
    form,
    name: "address.zip",
  });

  const stateField = useField({
    form,
    name: "address.state",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <FieldSet>
            <Label htmlFor={field.name}>Business name</Label>
            <Input
              autoComplete="off"
              autoCorrect="off"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Registered business name"
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>
      <form.Field name="type">
        {(field) => (
          <FieldSet>
            <Label htmlFor={field.name}>Type</Label>
            <Select
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) =>
                field.handleChange(e.target.value as typeof field.state.value)
              }
              value={field.state.value || ""}
            >
              <option disabled value="">
                Type of business
              </option>
              {companyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>
      <form.Field name="address.line1">
        {(field) => (
          <FieldSet>
            <Label htmlFor={field.name}>Address</Label>
            <Input
              autoComplete="address-line1"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Address line 1"
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>
      <form.Field name="address.line2">
        {(field) => (
          <FieldSet>
            <Input
              autoComplete="address-line2"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Address line 2 (optional)"
              value={field.state.value || ""}
            />
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>
      <form.Field name="address.city">
        {(field) => (
          <FieldSet>
            <Input
              autoComplete="address-level2"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="City"
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </FieldSet>
        )}
      </form.Field>
      <div style={{ display: "flex", columnGap: "1rem", marginTop: "1.5rem" }}>
        <form.Field name="address.state">
          {(field) => (
            <FieldSet style={{ flex: "1" }}>
              <Select
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(e.target.value as typeof field.state.value)
                }
                value={field.state.value || ""}
              >
                <option disabled value="">
                  State
                </option>
                {companyStates.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </FieldSet>
          )}
        </form.Field>
        <form.Field name="address.zip">
          {(field) => (
            <Input
              autoComplete="postal-code"
              id={field.name}
              maxLength={5}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Zip"
              style={{ flex: 1 }}
              value={field.state.value}
            />
          )}
        </form.Field>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <FieldInfo field={stateField} />
        <FieldInfo field={zipField} />
      </div>
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
