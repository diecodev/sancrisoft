import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormData } from "@/schemas/form";

type SubmissionState = {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;
};

type FormStore = {
  formData: FormData;
  submissionState: SubmissionState;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
  setSubmissionState: (state: Partial<SubmissionState>) => void;
  resetSubmissionState: () => void;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  name: "",
  type: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  },
} as unknown as FormData;

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: initialValues,
      submissionState: {
        isSubmitting: false,
        error: null,
        success: false,
        successMessage: null,
      },
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () =>
        set(() => ({
          formData: initialValues,
        })),
      setSubmissionState: (state) =>
        set((prev) => ({
          submissionState: { ...prev.submissionState, ...state },
        })),
      resetSubmissionState: () =>
        set(() => ({
          submissionState: {
            isSubmitting: false,
            error: null,
            success: false,
            successMessage: null,
          },
        })),
    }),
    {
      name: "formData",
    }
  )
);
