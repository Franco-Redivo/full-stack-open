import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { PatientsEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getPatients = (): PatientsEntry[] => {
    return patients;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const findById = (id: string) : NonSensitivePatientEntry | undefined => {
    const patient = patients.find(p => p.id === id);
    if (!patient) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitive } = patient;
    return nonSensitive as NonSensitivePatientEntry;
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitivePatientsEntries,
    addPatient,
    findById
};