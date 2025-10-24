import s from "styled-components";

export const ReviewContainer = s.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ReviewSection = s.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionHeader = s.header`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SectionTitle = s.h2`
  font-size: 1.125rem;
  font-weight: 500;
`;

export const EditButton = s.button`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bg-primary);
  background: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  border: none;

  &:focus-visible {
    outline: 2px solid var(--bg-primary);
    outline-offset: 2px;
  }
`;

export const ReviewList = s.dl`
  display: grid;
  grid-template-columns: minmax(8rem, auto) 1fr;
  row-gap: 1rem;
  column-gap: 1.5rem;
  margin: 0;
`;

export const ReviewTerm = s.dt`
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--foreground);
  opacity: 0.7;
`;

export const ReviewDefinition = s.dd`
  margin: 0;
  font-weight: 500;
  color: var(--foreground);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SubmitButton = s.button`
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
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--bg-primary);
    outline-offset: 2px;
  }
`;

export const ErrorMessage = s.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 0.5rem;
  color: #c33;
  font-size: 0.9375rem;
`;

export const SuccessMessage = s.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #efe;
  border: 1px solid #cfc;
  border-radius: 0.5rem;
  color: #363;
  font-size: 0.9375rem;
`;

export const AddressLine = s.span``;
