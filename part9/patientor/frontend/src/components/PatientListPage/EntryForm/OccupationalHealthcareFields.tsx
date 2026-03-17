interface Props {
    employerName: string;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveStartDate: string;
    setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveEndDate: string;
    setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareFields = ({
    employerName,
    setEmployerName,
    sickLeaveStartDate,
    setSickLeaveStartDate,
    sickLeaveEndDate,
    setSickLeaveEndDate,
}: Props) => {

    return (
        <div>
            <label style={{ display: "block", marginTop: "10px" }}>
                Employer:
                <input
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label style={{ display: "block", marginTop: "10px" }}>
                Sick Leave Start:
                <input
                    type="date"
                    value={sickLeaveStartDate}
                    onChange={(e) => setSickLeaveStartDate(e.target.value)}
                />
            </label>
            <br />
            <label style={{ display: "block", marginTop: "10px" }}>
                Sick Leave End:
                <input
                    type="date"
                    value={sickLeaveEndDate}
                    onChange={(e) => setSickLeaveEndDate(e.target.value)}
                />
            </label>
            
        </div>
    );
};

export default OccupationalHealthcareFields;