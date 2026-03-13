import type { HospitalEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface Props {
    entry: HospitalEntry;
}

const HospitalEntry = ({ entry }: Props) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <p>{entry.date} <MedicalInformationIcon /> {entry.description}</p>
            <p>Discharge Date: {entry.discharge.date}</p>
            <p>Discharge Criteria: {entry.discharge.criteria}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
};

export default HospitalEntry;