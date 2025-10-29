import { z } from 'zod';

// Schema for nested geo object
const geoSchema = z.object({
  lat: z.string().min(1, 'Latitude is required'),
  lng: z.string().min(1, 'Longitude is required'),
});

// Schema for nested address object
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  suite: z.string().min(1, 'Suite is required'),
  city: z.string().min(1, 'City is required'),
  zipcode: z.string().min(1, 'Zip code is required'),
  geo: geoSchema,
});

// Schema for nested company object
const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  catchPhrase: z.string().min(1, 'Catch phrase is required'),
  bs: z.string().min(1, 'Business field is required'),
});

// Main user schema
export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.email('Invalid email format').min(1, 'Email is required'),
  address: addressSchema,
  phone: z.string().min(1, 'Phone number is required'),
  website: z.string().min(1, 'Website is required'),
  company: companySchema,
});

// Type inference
export type UserFormSchema = z.infer<typeof userSchema>;
