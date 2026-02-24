import diagnoses from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const getDiagnoses = (): DiagnosesEntry[] => {
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnoses
};