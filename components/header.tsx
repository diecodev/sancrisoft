"use client";

import { Activity } from "react";
import s from "styled-components";
import { devices } from "@/constants/breakpoints";
import { useFormWrapper } from "@/hooks/use-form-wrapper";
import { Badge } from "./badge";

const HeaderStyled = s.header`
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  padding-inline: 1rem;

  @media ${devices.tablet} {
    padding-inline: 2rem;
  }

  @media ${devices.laptop} {
    padding-inline: 4rem;
  }
`;

export const Header = () => {
  const { isStep1Complete, isStep2Complete, isStep3Complete, submissionState } =
    useFormWrapper();

  const isInProgress = isStep1Complete || isStep2Complete;

  let badgeTheme: "success" | "error" | "in-progress";
  if (submissionState.success) {
    badgeTheme = "success";
  } else if (submissionState.error) {
    badgeTheme = "error";
  } else {
    badgeTheme = "in-progress";
  }

  return (
    <HeaderStyled>
      New Company
      <Activity mode={isInProgress || isStep3Complete ? "visible" : "hidden"}>
        <Badge theme={badgeTheme} />
      </Activity>
    </HeaderStyled>
  );
};
