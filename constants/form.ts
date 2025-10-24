export const formQueryParams = {
  stepper_key: "step",
  step_1: "structure",
  step_2: "contact",
  step_3: "details",
} as const;

export type FormStep =
  | typeof formQueryParams.step_1
  | typeof formQueryParams.step_2
  | typeof formQueryParams.step_3;

export const companyTypes = [
  "Sole Proprietorship",
  "General Partnership (GP)",
  "Limited Partnership (LP)",
  "Limited Liability Partnership (LLP)",
  "Limited Liability Company (LLC)",
  "C Corporation (C Corp)",
  "S Corporation (S Corp)",
  "Nonprofit Organization",
  "Cooperative (Co-op)",
  "Professional Corporation (PC)",
  "Professional Limited Liability Company (PLLC)",
] as const;

export const companyStates = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
] as const;

export const countries = [
  {
    id: "us",
    name: "United States",
    phone_code: "+1",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  },
  {
    id: "ca",
    name: "Canada",
    phone_code: "+1",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
  },
  {
    id: "uk",
    name: "United Kingdom",
    phone_code: "+44",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  },
  {
    id: "au",
    name: "Australia",
    phone_code: "+61",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg",
  },
  {
    id: "de",
    name: "Germany",
    phone_code: "+49",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
  },
  {
    id: "fr",
    name: "France",
    phone_code: "+33",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
  },
  {
    id: "jp",
    name: "Japan",
    phone_code: "+81",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
  },
  {
    id: "cn",
    name: "China",
    phone_code: "+86",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_China.svg",
  },
  {
    id: "in",
    name: "India",
    phone_code: "+91",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
  },
  {
    id: "br",
    name: "Brazil",
    phone_code: "+55",
    flag_url:
      "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  },
];
