import { AxiosError } from "axios";
import { ZodError } from "zod";

export function handleError(err: any) {
  if (err instanceof ZodError) {
    const errorMessages = err.issues.map((error) => error.message).join("\n");

    return { message: errorMessages };
  }

  if (err instanceof AxiosError) {
    return { message: err.response?.data.message };
  }

  return { message: "Ocorreu um erro inesperado. Tente novamente." };
}
