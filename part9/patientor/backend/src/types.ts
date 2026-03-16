import { z } from 'zod';
import { newPatientEntrySchema, newBaseEntrySchema, newHealthCheckEntrySchema, newHospitalEntrySchema, newOccupationalHealthcareEntrySchema } from './utils';
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
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesEntry['code']> | undefined;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave | undefined;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewBaseEntry = z.infer<typeof newBaseEntrySchema>;

export type NewHealthCheckEntry = z.infer<typeof newHealthCheckEntrySchema>;

export type NewHospitalEntry = z.infer<typeof newHospitalEntrySchema>;

export type NewOccupationalHealthcareEntry = z.infer<typeof newOccupationalHealthcareEntrySchema>;

export type NewEntry = NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry;

export type NonSensitivePatientEntry = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;