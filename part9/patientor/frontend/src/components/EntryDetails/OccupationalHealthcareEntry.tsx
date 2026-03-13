import type { OccupationalHealthcareEntry } from "../../types";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface Props {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <p>{entry.date}  <HeartBrokenIcon /> - {entry.description}</p>
            <p>Employer: {entry.employerName}</p>
            <p>Diagnosed by: {entry.specialist}</p>
            {entry.sickLeave && (
                <>
                    <p>Sick Leave Start: {entry.sickLeave.startDate}</p>
                    <p>Sick Leave End: {entry.sickLeave.endDate}</p>
                </>
            )}
        </div>
    );
};

export default OccupationalHealthcareEntry;