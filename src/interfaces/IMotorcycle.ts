import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const MotorcycleZodSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().max(2500),
}).merge(VehicleZodSchema);

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export interface IMotorcycleWithId extends IMotorcycle {
  _id: string,
}
