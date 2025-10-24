"use client";

import { useFormStore } from "@/hooks/use-form-store";
import { useFormWrapper } from "@/hooks/use-form-wrapper";
import { FormOne } from "./form-one";
import { FormReview } from "./form-review";
import { FormTwo } from "./form-two";

export const FormWrapper = () => {
  const {
    currentStep,
    onSubmitFormOne,
    onSubmitFormTwo,
    onSubmitFormReview,
    resetForm,
    submissionState,
  } = useFormWrapper();
  const { formData } = useFormStore();

  return (
    <div style={{ maxWidth: "26rem", flex: 1 }}>
      {currentStep === "structure" && (
        <FormOne defaultValues={formData} onSubmit={onSubmitFormOne} />
      )}

      {currentStep === "contact" && (
        <FormTwo defaultValues={formData} onSubmit={onSubmitFormTwo} />
      )}
      {currentStep === "details" && (
        <FormReview
          data={formData}
          error={submissionState.error}
          isSubmitting={submissionState.isSubmitting}
          onReset={resetForm}
          onSubmit={onSubmitFormReview}
          success={submissionState.success}
          successMessage={submissionState.successMessage}
        />
      )}
    </div>
  );
};
