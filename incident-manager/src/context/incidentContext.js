import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  incidents: [],
};

function incidnetReducer(state, action) {
  switch (action.type) {
    case "REFRESH":
      return { ...state, incidents: action.payload };
    case "ADD_INCIDENT":
      const newIncident = {
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      };
      return { ...state, incidents: [...state.incidents, newIncident] };
    case "TOGGLE_INCIDENT":
      return {
        ...state,
        incidents: state.incidents.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case "DELETE_INCIDENT":
      return {
        ...state,
        incidents: state.incidents.filter(
          (incident) => incident.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const IncidentContext = createContext();

export function Incident({ children }) {
  const [state, dispatch] = useReducer(incidnetReducer, initialState);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const res = await fetch("http://localhost:8080/api/v1/incident/getAll");
        const data = await res.json();
        dispatch({ type: "REFRESH", payload: data });
      } catch (err) {
        console.error("Error fetching incidents", err);
      }
    }
    fetchIncidents();
  }, []);

  const addIncident = async (text) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/incident/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      dispatch({ type: "ADD_INCIDENT", payload: data });
    } catch (err) {
      console.error("Add operation failed!!");
    }
  };
  const toggleIncident = (id) =>
    dispatch({ type: "TOGGLE_INCIDENT", payload: id });
  const deleteIncident = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/v1/incident/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_INCIDENT", payload: id });
    } catch (err) {
      console.error("Delete operation failed!");
    }
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents: state.incidents,
        addIncident,
        toggleIncident,
        deleteIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncident() {
  return useContext(IncidentContext);
}
