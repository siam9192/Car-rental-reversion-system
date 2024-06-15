export type TErrorSource = {
  path: string | number;
  message: string;
};
export type TErrorInterface = {
  statusCode: number;
  message: string;
  errorMessages: TErrorSource[];
};
