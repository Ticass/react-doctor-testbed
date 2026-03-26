import { useState } from "react";

// BUG: Calling setState during render — causes infinite re-render loop
export default function SetStateInRender() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("World");

  // Calling setState directly in render body — INFINITE LOOP
  // Uncomment to see the crash:
  // setCount(count + 1);

  // Sneaky version: conditional setState in render that eventually fires
  if (name === "trigger") {
    setName("reset"); // triggers re-render during render
    setCount((c) => c + 1);
  }

  return (
    <div>
      <h2>setState During Render</h2>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setName("trigger")}>
        Trigger render-time setState
      </button>
    </div>
  );
}
