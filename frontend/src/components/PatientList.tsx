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
    const interval = setInterval(fetchPatients, 2000);
    return () => clearInterval(interval);
  }, []);

  let currentTime = new Date("1970-01-01T10:00:00");

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
          {patients.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "gray" }}>
                No patients in queue
              </td>
            </tr>
          ) : (
            <>
              {/* RUNNING ROW */}
              <tr>
                <td></td>
                <td></td>
                <td style={{ color: "green" }}>RUNNING</td>
              </tr>

              {patients.map((p, index) => {
                let display;

                if (index === 0) {
                  display = "NEXT";
                } else if (p.type === "REPORT") {
                  display = "Report";
                } else {
                  currentTime = new Date(
                    currentTime.getTime() + 15 * 60 * 1000
                  );
                  display = currentTime.toTimeString().slice(0, 5);
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
