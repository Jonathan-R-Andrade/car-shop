import { z } from 'zod';

const currentYear = (new Date()).getFullYear();

export const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().int().min(1900).max(currentYear),
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
