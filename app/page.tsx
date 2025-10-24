import { Suspense } from "react";
import { FormWrapper } from "@/components/form";
import { PageWrapper } from "@/components/page-wrapper";
import { Stepper } from "@/components/stepper";

export default function Home() {
  return (
    <PageWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <Stepper />
        <FormWrapper />
      </Suspense>
    </PageWrapper>
  );
}
