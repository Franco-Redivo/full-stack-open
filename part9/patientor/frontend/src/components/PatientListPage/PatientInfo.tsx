import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from 'react';
import HealthCheckEntry from '../EntryDetails/HealthCheckEntry';
import HospitalEntry from '../EntryDetails/HospitalEntry';
import OccupationalHealthcareEntry from '../EntryDetails/OccupationalHealthcareEntry';
import type { Patient, Diagnosis, Entry } from "../../types";
import EntryForm from './EntryForm/EntryForm';

interface Props {
  patient: Patient | null;
  diagnoses: Diagnosis[];
}

const PatientInfo = ({ patient, diagnoses }: Props) => {
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        setEntries(patient?.entries ?? []);
    }, [patient]);

    if(!patient) {
        return <div>Patient not found</div>;
    }

    console.log(patient);
    const genderIcon = patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />;

    const entryDetails = (entry: Entry) => {
        switch(entry.type) {
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} />;
            case "Hospital":
                return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry entry={entry} />;
            default:
                return null;
        }
    };


    return (
        <div>
            <h2>{patient.name} {genderIcon}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <EntryForm patientId={patient.id} onEntryAdded={(entry) => setEntries((prev) => prev.concat(entry))} />
            <div>
                <h3>Entries</h3>
                {entries.length === 0 ? (
                    <p>No entries available.</p>
                ) : (
                    <div>
                        {entries.map((entry) => (
                            <div key={entry.id}>
                                {entryDetails(entry)}
                            </div>
                        ))}
                        {entries.map((entry) => (
                            <ul key={entry.id}>
                                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                                    <li key={code}>{code} : <span> {diagnoses.find(d => d.code === code)?.name}</span></li>
                                        
                                ))}
                            </ul>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientInfo;