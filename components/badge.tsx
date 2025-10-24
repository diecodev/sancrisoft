"use client";

import s from "styled-components";

type BadgeTheme = {
  fontColor: string;
};

type BadgeStatus = "success" | "default" | "in-progress" | "error";

const BadgeStyled = s.span<{ theme: BadgeTheme }>`
  min-width: 4.5rem;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.125rem;
  padding-inline: 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--border);

  color: ${(props) => props.theme.fontColor};
`;

const badgeThemes: Record<BadgeStatus, BadgeTheme> = {
  success: {
    fontColor: "var(--bg-success)",
  },
  default: {
    fontColor: "var(--border)",
  },
  "in-progress": {
    fontColor: "var(--pending)",
  },
  error: {
    fontColor: "var(--destructive)",
  },
};

export const Badge = ({ theme = "default" }: { theme?: BadgeStatus }) => (
  <BadgeStyled theme={badgeThemes[theme]}>
    {theme.replace("-", " ")}
  </BadgeStyled>
);
