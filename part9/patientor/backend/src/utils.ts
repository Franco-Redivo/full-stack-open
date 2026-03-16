import { NewPatientEntry, Gender, DiagnosesEntry, HealthCheckRating, NewEntry} from "./types";
import { z } from 'zod';

export const newPatientEntrySchema = z.object ({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const newBaseEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newHospitalEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    }),
});

export const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string().date(),
        endDate: z.string().date(),
    }).optional(),
});

export const newEntryUnionSchema = z.discriminatedUnion("type", [
    newHealthCheckEntrySchema,
    newHospitalEntrySchema,
    newOccupationalHealthcareEntrySchema,
]);

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newPatientEntrySchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
    return newEntryUnionSchema.parse(object);
};

export const parseDiagnosisCodes = (object: unknown): Array<DiagnosesEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosesEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosesEntry['code']>;
};


