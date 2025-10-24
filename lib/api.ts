import type { FormData } from "@/schemas/form";

type ApiResponse = {
  status: "ok" | "error";
  message: string;
};

type SubmitCompanyResult = {
  success: boolean;
  message: string;
};

export const submitCompany = async (
  data: FormData
): Promise<SubmitCompanyResult> => {
  const payload = {
    name: data.name,
    type: data.type,
    address: {
      line1: data.address.line1,
      line2: data.address.line2,
      city: data.address.city,
      state: data.address.state,
      zip: data.address.zip,
    },
    contact: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    },
  };

  try {
    const response = await fetch(
      "https://ss-company.free.beeceptor.com/company",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok && response.status === 500) {
      const errorData = (await response.json()) as ApiResponse;
      return {
        success: false,
        message:
          errorData.message ||
          "Sorry, we are having technical issues. Try again.",
      };
    }

    const responseData = (await response.json()) as ApiResponse;

    if (responseData.status === "error") {
      return {
        success: false,
        message: responseData.message,
      };
    }

    return {
      success: true,
      message: responseData.message,
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};
