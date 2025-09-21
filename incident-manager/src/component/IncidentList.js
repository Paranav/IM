import React from "react";
import { useIncident } from "../context/incidentContext";

function IncidentList() {
    const incidentContext = useIncident();

  return (
    <ul>
      {incidentContext.incidents.map((incident) => (
        <li
          id={incident.id}
          style={{
            margin: "8px 0",
            textDecoration: incident.completed ? "line-through" : "none",
          }}
        >
          <span
            onClick={() => incidentContext.toggleIncident(incident.id)}
            style={{ cursor: "pointer" }}
          >
            {incident.id} {":   "} {incident.text}
          </span>
          <button
            onClick={() => incidentContext.deleteIncident(incident.id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            {" "}
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default IncidentList;
