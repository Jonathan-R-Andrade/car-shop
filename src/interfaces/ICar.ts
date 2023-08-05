import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = z.object({
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
}).merge(VehicleZodSchema);

export type ICar = z.infer<typeof CarZodSchema>;

export interface ICarWithId extends ICar {
  _id: string,
}
