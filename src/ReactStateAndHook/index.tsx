import React, { useState, useEffect } from "react";

export type IProps = void;
export type IState = number;

function ReactStateAndHook(): React.JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You have clicked the first button ${count} time`);
  }, [count]);

  return (
    <div>
      <pre data-testid="counter">{count}</pre>
      <button
        onClick={() => setCount(prev => prev + 1)}
        data-testid="increment-button"
      >
        Click me
      </button>
    </div>
  );
}

export default ReactStateAndHook;
