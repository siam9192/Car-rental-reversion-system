import {z } from "zod";
import { CarStatus } from "./car.constant";

const createCarValidationSchema = z.object({
name:z.string(),
description:z.string(),
color:z.string(),
isElectric:z.boolean(),
features:z.array(z.string()),
pricePerHour:z.number(),
isDeleted:z.boolean().optional()
})

const carUpdateValidationSchema = createCarValidationSchema.partial()

export const CarValidations = {
    createCarValidationSchema,
    carUpdateValidationSchema
}