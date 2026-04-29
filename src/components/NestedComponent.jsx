import { useState } from "react";

// BUG: Component defined during render - remounts every parent render
export default function NestedComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  function InlineChild() {
    const [childCount, setChildCount] = useState(0);

    return (
      <div>
        <p>Child count resets whenever parent re-renders: {childCount}</p>
        <button onClick={() => setChildCount((value) => value + 1)}>
          Increment child
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Nested Component Definition</h2>
      <p>Parent count: {count}</p>
      <button onClick={() => setCount((value) => value + 1)}>
        Increment parent
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Typing here remounts the child"
      />
      <InlineChild />
    </div>
  );
}
