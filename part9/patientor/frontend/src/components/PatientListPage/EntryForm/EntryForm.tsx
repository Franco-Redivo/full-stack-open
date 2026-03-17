import { useState } from "react";
import axios from "axios";
import type { Entry, EntryFormValues } from "../../../types";
import patientsService from "../../../services/patients";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
//import { Input, Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import diagnoses from "../../../data";

interface Props {
    patientId: string;
    onEntryAdded: (entry: Entry) => void;
}

const EntryForm = ({ patientId, onEntryAdded }: Props) => {
    const [entryType, setEntryType] = useState<EntryFormValues["type"]>("HealthCheck");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [codes, setCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [employerName, setEmployerName] = useState<string>("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetForm = () => {
        setDescription("");
        setDate("");
        setSpecialist("");
        setCodes([]);
        setHealthCheckRating(0);
        setDischargeDate("");
        setDischargeCriteria("");
        setEmployerName("");
        setSickLeaveStartDate("");
        setSickLeaveEndDate("");
    };

    const handleCodesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setCodes(typeof value === "string" ? value.split(",") : value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const baseEntry = {
            description,
            date,
            specialist,
            ...(codes.length > 0 ? { diagnosisCodes: codes } : {}),
        };

        let entry: EntryFormValues;

        switch (entryType) {
            case "HealthCheck":
                entry = {
                    ...baseEntry,
                    type: "HealthCheck",
                    healthCheckRating,
                };
                break;
            case "Hospital":
                entry = {
                    ...baseEntry,
                    type: "Hospital",
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    },
                };
                break;
            case "OccupationalHealthcare":
                entry = {
                    ...baseEntry,
                    type: "OccupationalHealthcare",
                    employerName,
                    ...(sickLeaveStartDate && sickLeaveEndDate
                        ? {
                              sickLeave: {
                                  startDate: sickLeaveStartDate,
                                  endDate: sickLeaveEndDate,
                              },
                          }
                        : {}),
                };
                break;
            default:
                return;
        }

        try {
            setError("");
            const createdEntry = await patientsService.createEntry(patientId, entry);
            onEntryAdded(createdEntry);
            resetForm();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data?.error ? JSON.stringify(e.response.data.error) : "Failed to add entry");
            } else {
                setError("Failed to add entry");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: "1px solid black", padding: "10px", marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>
                Type:
                <select value={entryType} onChange={(e) => setEntryType(e.target.value as EntryFormValues["type"])}>
                    <option value="HealthCheck">Health Check</option>
                    <option value="Hospital">Hospital</option>
                    <option value="OccupationalHealthcare">Occupational Healthcare</option>
                </select>
            </label>
            <br />
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <br />
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <br />
            <label>
                Specialist:
                <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} required />
            </label>
            <br />
            <label>
                Diagnosis Codes:
                <Select
                    multiple
                    value={codes}
                    onChange={handleCodesChange}
                >
                    {diagnoses.map((diagnosis) => (
                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                            {diagnosis.code}
                        </MenuItem>
                    ))}
                </Select>
            </label>
            <br />
            {entryType === "HealthCheck" && (
                <HealthCheckFields
                    healthCheckRating={healthCheckRating}
                    setHealthCheckRating={setHealthCheckRating}
                />
            )}
            {entryType === "Hospital" && (
                <HospitalFields
                    dischargeDate={dischargeDate}
                    setDischargeDate={setDischargeDate}
                    dischargeCriteria={dischargeCriteria}
                    setDischargeCriteria={setDischargeCriteria}
                />
            )}
            {entryType === "OccupationalHealthcare" && (
                <OccupationalHealthcareFields
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    sickLeaveStartDate={sickLeaveStartDate}
                    setSickLeaveStartDate={setSickLeaveStartDate}
                    sickLeaveEndDate={sickLeaveEndDate}
                    setSickLeaveEndDate={setSickLeaveEndDate}
                />
            )}
            <button type="submit" style={{ height: "40px", width: "100px" }} >Add Entry</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default EntryForm;