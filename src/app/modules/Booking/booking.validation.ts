import { z } from "zod";

const createBookingValidationSchema = z.object({
    date: z.string(),
    user: z.string(), 
    car: z.string(), 
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
});
const updateReturnTheCarValidationSchema = z.object({
    bookingId:z.string(),
    endTime:z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
})

export const BookingValidations = {
    createBookingValidationSchema,
    updateReturnTheCarValidationSchema
}