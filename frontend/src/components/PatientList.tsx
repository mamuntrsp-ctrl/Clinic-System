import { useState, useEffect } from "react";
import { Patient } from "../types";
import { getPatients } from "../services/api";

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="right-panel">
      <table className="patient-table">
        {/* HEADER */}
        <thead>
          <tr>
            <th>SERIAL</th>
            <th>PATIENT NAME</th>
            <th>STATUS / TIME</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.serial}</td>
              <td>{p.name}</td>
              <td
                className={`status ${
                  p.status?.toLowerCase() === "running"
                    ? "running"
                    : p.status?.toLowerCase() === "next"
                    ? "next"
                    : ""
                }`}
              >
                {p.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
