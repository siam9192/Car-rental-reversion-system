import { TErrorInterface, TErrorSource } from "../interface/error";

export const HandleDuplicateError = (err: any): TErrorInterface => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
  
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
  
    const errorMessages: TErrorSource[] = [
      {
        path: '',
        message: err?.message || "",
      },
    ];
  
    const statusCode = 400;
  
    return {
      statusCode,
      message: err?.message,
      errorMessages,
    };
  };
  
  
  