interface Props {
    healthCheckRating: number;
    setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating }: Props) => {
    return (
        <div>
            <label style={{ display: "block", marginTop: "10px" }}>
                Health Check Rating:
                <input
                    type="number"
                    value={healthCheckRating}
                    onChange={(e) => setHealthCheckRating(Number(e.target.value))}
                    min={0}
                    max={3}
                    required
                />
            </label>
        </div>
    );
};

export default HealthCheckFields;