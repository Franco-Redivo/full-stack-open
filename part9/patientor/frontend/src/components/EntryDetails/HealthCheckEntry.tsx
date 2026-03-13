import type { HealthCheckEntry} from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HealthCheckEntry;
}

const HealthCheckEntry = ({ entry }: Props) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <p>{entry.date} <LocalHospitalIcon /> - {entry.description}</p>
            <p>Health Check Rating: {entry.healthCheckRating}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
};

export default HealthCheckEntry;