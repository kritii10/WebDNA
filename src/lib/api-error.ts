import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim().length > 0) {
      if (error.response?.status === 401) {
        return "Your session has expired. Please sign in again.";
      }

      return responseMessage;
    }

    if (error.response?.status === 401) {
      return "Your session has expired. Please sign in again.";
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}
