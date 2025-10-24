# Company Registration Form

A responsive multi-step form application for company registration built with Next.js, TypeScript, and Styled Components.

## Features

- **Multi-step form** with 3 steps: Business Structure, Contact Person, and Review & Submit
- **Form validation** with user-friendly error messages
- **Persistent data** - form data is saved in browser storage
- **Responsive design** - works seamlessly on mobile, tablet, and desktop
- **Step navigation** - users can move between completed steps
- **API integration** - submits company data to a REST API

## Tech Stack

- Next.js (latest version)
- React with TypeScript
- Styled Components
- Zustand (state management)
- Zod (form validation)

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Form Steps

### Step 1: Business Structure
- Company name
- Company type
- Address (line 1, line 2, city, state, zip)

### Step 2: Contact Person
- First name and last name
- Email address
- Phone number

### Step 3: Review & Submit
- Review all entered information
- Edit previous steps if needed
- Submit to API
- View success or error messages

## Validation Rules

- All fields are required except address line 2
- ZIP code must be 5 digits
- Email must be a valid email address
- Phone must follow format: +1 (234) 454-2345

## API

The form submits to: `https://ss-company.free.beeceptor.com/company`

**Success Response:**
```json
{
  "status": "ok",
  "message": "Thanks for submitting your company! We'll be in touch shortly."
}
```

**Error Response (duplicate name):**
```json
{
  "status": "error",
  "message": "A company with the same name has been detected..."
}
```

