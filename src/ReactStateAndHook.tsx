import React, { useState, useEffect } from "react";

export type IProps = void;
export type IState = number;

function ReactStateAndHook<IProps, IState>(): React.JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You have clicked the first button ${count} times`);
  }, [count]);

  return (
    <div>
      <pre data-testid="counter">{count}</pre>
      <button
        onClick={() => setCount(prev => prev + 11)}
        data-testid="increment-button"
      >
        Click me
      </button>
    </div>
  );
}

export default ReactStateAndHook;
