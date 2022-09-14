import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const CarZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max((new Date()).getFullYear()),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().positive(),
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}
