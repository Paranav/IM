import { createContext, useContext, useReducer } from "react";

const initialState = {
  QandA: [],
};

function qandQReducer(state, action) {
  switch (action.type) {
    case "ADD_QANDA":
      const newItem = {
        id: state.QandA.length + 1,
        question: action.payload.question,
        answer: action.payload.answer,
      };
      const updatedQandA = [...state.QandA, newItem];
      return { ...state, QandA: updatedQandA };
    default:
      return state;
  }
}

export function AIQueryHistory({ children }) {
  const [state, dispatch] = useReducer(qandQReducer, initialState);

  const addNewQandA = (data) => dispatch({ type: "ADD_QANDA", payload: data });

  return (
    <AIQandAContext.Provider value={{ data: state.QandA, addNewQandA }}>
      {children}
    </AIQandAContext.Provider>
  );
}

export const AIQandAContext = createContext();

export function useAIQandA() {
  return useContext(AIQandAContext);
}
