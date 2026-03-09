import { z } from 'zod';
import { newEntrySchema } from './utils';
export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;