import React from "react";
import { useAIQandA } from "../context/AIQandAContext";

function AIHistory() {
    const AIQueryHistoryContext = useAIQandA();
  return (
    <ul>
      <h3>AI Query History</h3>
      {AIQueryHistoryContext.data.map((queryHistory) => (
        <li
          id={queryHistory.id}
        >
          <span>
          Question - {queryHistory.question}
          </span>
          <br></br>
           <span>
          Answer - {queryHistory.answer}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default AIHistory;
