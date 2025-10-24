import { FormWrapper } from "@/components/form";
import { PageWrapper } from "@/components/page-wrapper";
import { Stepper } from "@/components/stepper";

export default function Home() {
  return (
    <PageWrapper>
      <Stepper />
      <FormWrapper />
    </PageWrapper>
  );
}
