import { AxiosError } from "axios";

function isCustomError(error: CustomError | AxiosError): error is CustomError {
  return (error as CustomError).response !== undefined;
}

export const getError = (error: CustomError | AxiosError): string => {
  if (isCustomError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }

  return error.message;
};
