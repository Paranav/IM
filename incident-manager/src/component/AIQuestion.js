import { useState } from "react";
import AIAnswer from "./AIAnswer";
import { useAIQandA } from "../context/AIQandAContext";

function AIQuestion() {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const AIQueryHistoryContext = useAIQandA();

  async function askAI(query) {
    try {
      const resp = await fetch("http://localhost:8080/api/v1/incident/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const ans = await resp.json();
      setAnswer(ans.answer)
      AIQueryHistoryContext.addNewQandA({question, answer:ans.answer});
    } catch (err) {
        setAnswer("Error!!")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    askAI(question)
  };
  return (
    <div>
      <h3>Ask AI</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="5"
          cols="40"
        />
        <br />
        <button type="submit">ask</button>
      </form>
      <AIAnswer answer={answer} />
    </div>
  );
}

export default AIQuestion;
