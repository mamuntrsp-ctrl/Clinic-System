import { useState, useEffect } from "react";
import { Patient } from "../types";
import { getPatients } from "../services/api";

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [runningPatient, setRunningPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();

        // hide completed
        const active = data.filter((p) => p.status !== "COMPLETED");

        const running = active.find((p) => p.status === "RUNNING");
        setRunningPatient(running || null);

        setPatients(active.filter((p) => p.status !== "RUNNING"));
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="right-panel">
      <table className="patient-table">
        <thead>
          <tr>
            <th>SERIAL</th>
            <th>PATIENT NAME</th>
            <th>STATUS / TIME</th>
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 && !runningPatient ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "gray" }}>
                No patients in queue
              </td>
            </tr>
          ) : (
            <>
              {/* RUNNING */}
              {runningPatient && (
                <tr>
                  <td>{runningPatient.serial}</td>
                  <td>{runningPatient.name}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    RUNNING
                  </td>
                </tr>
              )}

              {patients.map((p) => {
                let display: string;

                if (p.status === "NEXT") {
                  display = "NEXT";
                } else if (p.type === "REPORT") {
                  display = "REPORT";
                } else {
                  // ✅ FIXED: time comes from backend
                  display = p.scheduledTime || "";
                }

                return (
                  <tr key={p.id}>
                    <td>{p.serial}</td>
                    <td>{p.name}</td>
                    <td>{display}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
