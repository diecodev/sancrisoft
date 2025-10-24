"use client";

import s from "styled-components";
import { devices } from "@/constants/breakpoints";

export const PageWrapper = s.main`
  padding-inline: 1rem;
  display: flex;
  gap: 1rem;
  padding-block: 4rem;
  
  @media ${devices.tablet} {
    padding-inline: 2rem;
    gap: 1.5rem;
    }
    
    @media ${devices.laptop} {
      padding-inline: 4rem;
      gap: 4rem;
  }
`;
