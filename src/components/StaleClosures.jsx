import { useState, useEffect, useRef } from "react";

// BUG: Stale closure problems
export default function StaleClosures() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // Stale closure: the alert captures the count at click time
  const showCountDelayed = () => {
    setTimeout(() => {
      // This will show the OLD count, not the current one
      alert("Count is: " + count);
    }, 3000);
  };

  // Stale closure in effect: handler captures initial count forever
  useEffect(() => {
    const handler = () => {
      // Always sees count = 0 because dependency array is []
      setMessage(`Clicked when count was: ${count}`);
    };
    document.getElementById("stale-btn")?.addEventListener("click", handler);
    return () =>
      document.getElementById("stale-btn")?.removeEventListener("click", handler);
  }, []); // count is stale here

  // Ref used incorrectly — no .current access
  const inputRef = useRef(null);
  const focusInput = () => {
    // Missing .current — this would fail silently or error
    try {
      inputRef.focus();
    } catch {
      console.error("Forgot .current on ref!");
    }
  };

  return (
    <div>
      <h2>Stale Closures</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={showCountDelayed}>
        Show Count in 3s (will be stale)
      </button>
      <button id="stale-btn">Click me (stale handler)</button>
      <p>{message}</p>
      <input ref={inputRef} placeholder="Focus me" />
      <button onClick={focusInput}>Focus Input (broken ref)</button>
    </div>
  );
}
