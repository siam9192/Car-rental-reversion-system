import { z } from 'zod';

const signInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthValidations = {
  signInValidationSchema,
};
