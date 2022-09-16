import { z } from 'zod';

export const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max((new Date()).getFullYear()),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().positive(),
});

export interface IVehicle {
  model: string,
  year: number,
  color: string,
  status?: boolean,
  buyValue: number,
}
