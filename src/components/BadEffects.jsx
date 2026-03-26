import { useState, useEffect } from "react";

// BUG: useEffect anti-patterns
export default function BadEffects() {
  const [data, setData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [count, setCount] = useState(0);

  // Anti-pattern: deriving state from state via useEffect (should just compute)
  useEffect(() => {
    if (data) {
      setProcessedData(data.toUpperCase());
    }
  }, [data]);

  // Anti-pattern: infinite loop — setCount triggers re-render, effect re-runs
  // (commented guard makes it sneaky)
  useEffect(() => {
    // This will loop: count changes → effect runs → setCount → count changes
    if (count < 5) {
      setCount(count + 1);
    }
  }, [count]);

  // Anti-pattern: unnecessary effect for event-driven logic
  useEffect(() => {
    document.title = `Count: ${count}`;
  });
  // Missing dependency array entirely — runs every render

  const handleInput = (e) => {
    setData(e.target.value);
  };

  return (
    <div>
      <h2>Bad Effects</h2>
      <input onChange={handleInput} placeholder="Type something..." />
      <p>Raw: {data}</p>
      <p>Processed: {processedData}</p>
      <p>Count (auto-increments to 5): {count}</p>
    </div>
  );
}
