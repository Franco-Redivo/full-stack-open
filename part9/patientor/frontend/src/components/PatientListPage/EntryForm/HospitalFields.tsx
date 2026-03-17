interface Props {
    dischargeDate: string;
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    dischargeCriteria: string;
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalFields = ({
    dischargeDate,
    setDischargeDate,
    dischargeCriteria,
    setDischargeCriteria,
}: Props) => {

    return (
        <div>
            <label style={{ display: "block", marginTop: "10px" }}>
                Discharge Date:
                <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                    required
                />
            </label>
            <br />
            <label style={{ display: "block", marginTop: "10px" }}>
                Discharge Criteria:
                <input
                    type="text"
                    value={dischargeCriteria}
                    onChange={(e) => setDischargeCriteria(e.target.value)}
                    required
                />
            </label>
        </div>
    );
};

export default HospitalFields;