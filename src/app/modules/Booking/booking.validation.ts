import { z } from "zod";

const createBookingValidationSchema = z.object({
    carId: z.string(), 
    date: z.string(),
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