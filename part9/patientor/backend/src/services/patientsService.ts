import patients from '../../data/patients';
import { PatientsEntry, NonSensitivePatientEntry } from '../types';

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

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getNonSensitivePatientsEntries,
    addPatient
};