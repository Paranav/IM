import "./App.css";
import AIAnswer from "./component/AIAnswer";
import AIHistory from "./component/AIHistory";
import AIQuestion from "./component/AIQuestion";
import IncidentFrom from "./component/IncidentForm";
import IncidentList from "./component/IncidentList";
import { AIQueryHistory } from "./context/AIQandAContext";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Incident Manager</h1>
      <IncidentFrom />
      <IncidentList />
      <AIQueryHistory>
        <AIQuestion />
        <AIHistory />
      </AIQueryHistory>
    </div>
  );
}

export default App;
