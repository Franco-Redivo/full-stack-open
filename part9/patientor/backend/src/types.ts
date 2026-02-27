import { z } from 'zod';
import { newEntrySchema } from './utils';
export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;