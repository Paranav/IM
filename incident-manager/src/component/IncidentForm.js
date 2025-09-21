import React, { useState } from "react";
import { useIncident } from "../context/incidentContext";

function IncidentFrom() {
  const [incident, setIncident] = useState("");

  const incidentContext = useIncident();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (incident.trim === "") return;
    incidentContext.addIncident(incident);
    setIncident("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={incident}
        onChange={(e) => setIncident(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default IncidentFrom;
