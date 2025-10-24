import type { AnyFieldApi } from "@tanstack/react-form";
import { TriangleAlert } from "lucide-react";
import s from "styled-components";
import { sizes } from "@/constants/breakpoints";

type InputTheme = {
  border: string;
};

export const FieldSet = s.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin-top: 1.5rem;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const FieldRow = s.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  & > ${FieldSet} {
    flex: 1;
    margin-top: 0;
  }

  @media (max-width: ${sizes.tablet}) {
    flex-direction: column;
  }
`;

export const Label = s.label`
  display: block;
  font-weight: 500;
  font-size: 1.125rem;
`;

export const Input = s.input<{ theme: InputTheme }>`
  width: 100%;
  flex: 1;
  min-height: 2.125rem;
  padding-inline: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  background-color: var(--background);
  transition: border-color 0.2s;
  color: var(--foreground);

  &:focus-visible {
    outline: none;
    border-color: var(--bg-primary);
  }
`;

Input.defaultProps = {
  theme: {
    border: "var(--border)",
  },
};

export const Select = s.select<{ theme: InputTheme }>`
  width: 100%;
  flex: 1;
  min-height: 2.125rem;
  padding-inline: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  background-color: var(--background);
  transition: border-color 0.2s;
  color: var(--foreground);

  &:focus-visible {
    outline: none;
    border-color: var(--bg-primary);
  }
`;

Select.defaultProps = {
  theme: {
    border: "var(--border)",
  },
};

export const FormButton = s.button`
  margin-top: 2rem;
  background: var(--bg-primary);
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  min-height: 2.125rem;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
`;

export const PhoneContainer = s.div`
  display: flex;
  align-items: stretch;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: border-color 0.2s;
  
  &:focus-within {
    border-color: var(--bg-primary);
  }
`;

export const CountrySelect = s.div`
  position: relative;
  min-width: 100px;
  border-right: 1px solid var(--border);
  
  select {
    width: 100%;
    min-height: 2.125rem;
    padding-inline: 2.5rem 2rem;
    font-size: 1rem;
    border: none;
    background-color: var(--background);
    color: var(--foreground);
    appearance: none;
    cursor: pointer;
    
    &:focus-visible {
      outline: none;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--foreground);
    pointer-events: none;
  }
`;

export const FlagIcon = s.img`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
  pointer-events: none;
  z-index: 1;
`;

export const PhoneInput = s.input`
  width: 100%;
  flex: 1;
  min-height: 2.125rem;
  padding-inline: 0.5rem;
  font-size: 1rem;
  border: none;
  background-color: var(--background);
  color: var(--foreground);
  
  &:focus-visible {
    outline: none;
  }
  
  &::placeholder {
    color: var(--muted-foreground);
  }
`;

const ErrorContainer = s.div`
  text-align: left;
`;

const ErrorMessage = s.span`
  font-size: 0.875rem;
  color: var(--destructive);
  display: block;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  const { isTouched, isValid, errors } = field.state.meta;

  if (isTouched && !isValid) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          <TriangleAlert style={{ color: "#F43C3C" }} width={20} />
          {typeof errors[0] === "string" ? errors[0] : errors[0]?.message}
        </ErrorMessage>
      </ErrorContainer>
    );
  }

  return null;
};
