import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import type { Patient } from "../types";

interface Props {
  patient: Patient | null;
}

const PatientInfo = ({ patient }: Props) => {
    if(!patient) {
        return <div>Patient not found</div>;
    }
    console.log(patient);
    const genderIcon = patient.gender === 'female' ? <FemaleIcon /> : <MaleIcon />;

    return (
        <div>
            <h2>{patient.name} {genderIcon}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <div>
                <h3>Entries</h3>
                {patient.entries.length === 0 ? (
                    <p>No entries available.</p>
                ) : (
                    <div>
                        {patient.entries.map((entry) => (
                            <div key={entry.id}>
                                <p>{entry.date} - {entry.description}</p>
                            </div>
                        ))}
                        {patient.entries.map((entry) => (
                            <ul key={entry.id}>
                                {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
                                    <li key={code}>{code}</li>
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