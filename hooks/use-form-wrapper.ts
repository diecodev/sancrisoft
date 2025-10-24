"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { formQueryParams } from "@/constants/form";
import { submitCompany } from "@/lib/api";
import {
  type FormStepOneData,
  type FormStepTwoData,
  formStepOneSchema,
  formStepTwoSchema,
} from "@/schemas/form";
import { useFormStore } from "./use-form-store";

type ShouldRedirectParams = {
  currentParam: string | null;
  searchParams: URLSearchParams;
  nextStep: string;
  isStep1Complete: boolean;
  isStep2Complete: boolean;
};

const shouldRedirectToNextStep = ({
  currentParam,
  searchParams,
  nextStep,
  isStep1Complete,
  isStep2Complete,
}: ShouldRedirectParams) => {
  if (searchParams.toString() === "") {
    return true;
  }

  const completedSteps: string[] = [];
  if (isStep1Complete) {
    completedSteps.push(formQueryParams.step_1);
  }
  if (isStep2Complete) {
    completedSteps.push(formQueryParams.step_2);
  }

  if (currentParam === null) {
    return false;
  }

  if (completedSteps.includes(currentParam)) {
    return false;
  }

  return currentParam !== nextStep;
};

export const useFormStep = () => {
  const queryParams = useSearchParams();

  const stepParam = queryParams.get(formQueryParams.stepper_key);

  const isValidStep =
    stepParam === formQueryParams.step_1 ||
    stepParam === formQueryParams.step_2 ||
    stepParam === formQueryParams.step_3;

  return {
    currentStep: isValidStep ? stepParam : formQueryParams.step_1,
  };
};

export const useFormWrapper = () => {
  "use no memo";

  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentStep } = useFormStep();
  const {
    formData,
    setFormData,
    submissionState,
    setSubmissionState,
    resetFormData,
    resetSubmissionState,
  } = useFormStore();

  const isStep1Complete = formStepOneSchema.safeParse(formData).success;
  const isStep2Complete =
    isStep1Complete && formStepTwoSchema.safeParse(formData).success;

  const nextStep = isStep1Complete
    ? // biome-ignore lint/style/noNestedTernary: <>
      isStep2Complete
      ? formQueryParams.step_3
      : formQueryParams.step_2
    : formQueryParams.step_1;

  const currentParam = searchParams.get(formQueryParams.stepper_key);
  const shouldRedirect = shouldRedirectToNextStep({
    currentParam,
    searchParams,
    nextStep,
    isStep1Complete,
    isStep2Complete,
  });

  useEffect(() => {
    if (!useFormStore.persist.hasHydrated()) {
      return;
    }

    if (!shouldRedirect) {
      return;
    }

    if (currentParam !== nextStep) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(formQueryParams.stepper_key, nextStep);
      router.replace(`?${params.toString()}`);
    }
  }, [currentParam, nextStep, router, searchParams, shouldRedirect]);

  const onSubmitFormOne = (data: FormStepOneData) => {
    setFormData(data);
    router.push(`?${formQueryParams.stepper_key}=${formQueryParams.step_2}`);
  };

  const onSubmitFormTwo = (data: FormStepTwoData) => {
    setFormData(data);
    router.push(`?${formQueryParams.stepper_key}=${formQueryParams.step_3}`);
  };

  const onSubmitFormReview = async () => {
    resetSubmissionState();
    setSubmissionState({ isSubmitting: true, error: null });

    try {
      const result = await submitCompany(formData);

      if (result.success) {
        setSubmissionState({
          isSubmitting: false,
          success: true,
          error: null,
          successMessage: result.message,
        });
      } else {
        setSubmissionState({
          isSubmitting: false,
          success: false,
          error: result.message,
        });
      }
    } catch {
      setSubmissionState({
        isSubmitting: false,
        success: false,
        error: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const resetForm = () => {
    resetFormData();
    resetSubmissionState();
    router.push(`?${formQueryParams.stepper_key}=${formQueryParams.step_1}`);
  };

  return {
    currentStep,
    onSubmitFormOne,
    onSubmitFormTwo,
    onSubmitFormReview,
    resetForm,
    isStep1Complete,
    isStep2Complete,
    isStep3Complete: submissionState.success,
    canEdit: !submissionState.success,
    submissionState,
  };
};
