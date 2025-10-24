"use client";

import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import s from "styled-components";
import { devices } from "@/constants/breakpoints";
import type { FormStep } from "@/constants/form";
import { useFormWrapper } from "@/hooks/use-form-wrapper";

type Theme = {
  background: string;
  foreground: string;
};

const steps: Array<{ label: string; step: FormStep; stepIndex: number }> = [
  {
    label: "Business structure",
    step: "structure",
    stepIndex: 1,
  },
  {
    label: "Contact person",
    step: "contact",
    stepIndex: 2,
  },
  {
    label: "Review & submit",
    step: "details",
    stepIndex: 3,
  },
];

const StepperAction = s.button<{ theme: Theme }>`
  aspect-ratio: 1 / 1;
  min-width: 1.625rem;
  height: auto;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 500;

  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
`;

StepperAction.defaultProps = {
  theme: {
    background: "var(--background)",
    foreground: "var(--foreground)",
  },
};

const activeTheme: Theme = {
  background: "var(--bg-primary)",
  foreground: "#fff",
};

const iconTheme: Theme = {
  background: "var(--bg-success)",
  foreground: "#fff",
};

const StepperActionWrapper = s.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  gap: 1.5rem;
  border-radius: 3rem;
  background-color: var(--border);
`;

const StepperContainer = s.div`
  display: flex;
  align-items: center;
  height: fit-content;

  @media ${devices.laptop} {
    gap: 1rem;
  }
`;

const StepperLabel = s.button`
  background: none;
  padding: 0;
  height: fit-content;
  color: var(--foreground);
  display: none;

  @media ${devices.laptop} {
    display: block;
  }
`;

const StepperLabelsWrapper = s.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.75rem;
`;

export const Stepper = () => {
  const router = useRouter();
  const {
    currentStep,
    isStep1Complete,
    isStep2Complete,
    isStep3Complete,
    canEdit,
  } = useFormWrapper();

  return (
    <StepperContainer>
      <StepperActionWrapper>
        {steps.map((step) => {
          const isActive = currentStep === step.step;
          const showIcon =
            (step.step === "structure" && isStep1Complete) ||
            (step.step === "contact" && isStep2Complete) ||
            (step.step === "details" && isStep3Complete);

          const canEditStep = showIcon && canEdit;

          let themeToUse: Theme | undefined;
          if (showIcon) {
            themeToUse = iconTheme;
          } else if (isActive) {
            themeToUse = activeTheme;
          }

          return (
            <StepperAction
              key={step.step}
              onClick={() => {
                if (canEditStep) {
                  router.push(`?step=${step.step}`);
                }
              }}
              theme={themeToUse}
            >
              {showIcon ? (
                <CheckIcon strokeWidth={3} width={14} />
              ) : (
                step.stepIndex
              )}
            </StepperAction>
          );
        })}
      </StepperActionWrapper>
      <StepperLabelsWrapper>
        {steps.map((step) => {
          const showIcon =
            (step.step === "structure" && isStep1Complete) ||
            (step.step === "contact" && isStep2Complete) ||
            (step.step === "details" && isStep3Complete);

          const canEditStep = showIcon && canEdit;

          return (
            <li key={step.step}>
              <StepperLabel
                onClick={() => {
                  if (canEditStep) {
                    router.push(`?step=${step.step}`);
                  }
                }}
                type="button"
              >
                {step.label}
              </StepperLabel>
            </li>
          );
        })}
      </StepperLabelsWrapper>
    </StepperContainer>
  );
};
