"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { formQueryParams } from "@/constants/form";
import type { FormData } from "@/schemas/form";
import {
  AddressLine,
  EditButton,
  ErrorMessage,
  ReviewContainer,
  ReviewDefinition,
  ReviewList,
  ReviewSection,
  ReviewTerm,
  SectionHeader,
  SectionTitle,
  SubmitButton,
  SuccessMessage,
} from "./form-review-fields";

type FormReviewProps = {
  data: FormData;
  onSubmit: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  success?: boolean;
  successMessage?: string | null;
  onReset: () => void;
};

export const FormReview = ({
  data,
  onSubmit,
  isSubmitting = false,
  error = null,
  success = false,
  successMessage = null,
  onReset,
}: FormReviewProps) => {
  const router = useRouter();

  const fullName = useMemo(
    () => [data.firstName, data.lastName].filter(Boolean).join(" "),
    [data.firstName, data.lastName]
  );

  const addressLines = useMemo(() => {
    const lines: Array<{ id: string; value: string }> = [];

    const { line1, line2, city, state, zip } = data.address;

    if (line1) {
      lines.push({ id: "line1", value: line1 });
    }

    if (line2) {
      lines.push({ id: "line2", value: line2 });
    }

    const cityState = [city, state].filter(Boolean).join(", ");
    const cityStateZip = [cityState, zip].filter(Boolean).join(" ");

    if (cityStateZip) {
      lines.push({ id: "city-state-zip", value: cityStateZip });
    }

    return lines;
  }, [data.address]);

  const handleEditStructure = () => {
    router.push(`?${formQueryParams.stepper_key}=${formQueryParams.step_1}`);
  };

  const handleEditContact = () => {
    router.push(`?${formQueryParams.stepper_key}=${formQueryParams.step_2}`);
  };

  return (
    <ReviewContainer>
      <ReviewSection>
        <SectionHeader>
          <SectionTitle>Business structure</SectionTitle>
          {!success && (
            <EditButton
              aria-label="Edit business structure"
              onClick={handleEditStructure}
              type="button"
            >
              Edit
            </EditButton>
          )}
        </SectionHeader>
        <ReviewList>
          <ReviewTerm>Name:</ReviewTerm>
          <ReviewDefinition>
            <span>{data.name}</span>
          </ReviewDefinition>
          <ReviewTerm>Type:</ReviewTerm>
          <ReviewDefinition>
            <span>{data.type}</span>
          </ReviewDefinition>
          <ReviewTerm>Address:</ReviewTerm>
          <ReviewDefinition>
            {addressLines.map((line) => (
              <AddressLine key={line.id}>{line.value}</AddressLine>
            ))}
          </ReviewDefinition>
        </ReviewList>
      </ReviewSection>

      <ReviewSection>
        <SectionHeader>
          <SectionTitle>Contact person</SectionTitle>
          {!success && (
            <EditButton
              aria-label="Edit contact information"
              onClick={handleEditContact}
              type="button"
            >
              Edit
            </EditButton>
          )}
        </SectionHeader>
        <ReviewList>
          <ReviewTerm>Name:</ReviewTerm>
          <ReviewDefinition>
            <span>{fullName}</span>
          </ReviewDefinition>
          <ReviewTerm>Email:</ReviewTerm>
          <ReviewDefinition>
            <span>{data.email}</span>
          </ReviewDefinition>
          <ReviewTerm>Phone:</ReviewTerm>
          <ReviewDefinition>
            <span>{data.phone}</span>
          </ReviewDefinition>
        </ReviewList>
      </ReviewSection>

      {!success && (
        <SubmitButton disabled={isSubmitting} onClick={onSubmit} type="button">
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Confirm & Submit
              <ArrowRight width={16} />
            </>
          )}
        </SubmitButton>
      )}

      {success && (
        <>
          <SuccessMessage>
            {successMessage ||
              "Thanks for submitting your company! We'll be in touch shortly."}
          </SuccessMessage>
          <SubmitButton onClick={onReset} type="button">
            Start Over
            <ArrowRight width={16} />
          </SubmitButton>
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ReviewContainer>
  );
};
