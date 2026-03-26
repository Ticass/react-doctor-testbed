import { useState, createContext, useContext } from "react";

const ThemeContext = createContext();

// BUG: New object/array/function references created every render
// causing unnecessary re-renders in children
export default function UnnecessaryRerenders() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // New object every render — children receiving this as prop will re-render
  const style = { color: "blue", fontSize: 16 };

  // New array every render
  const options = ["one", "two", "three"];

  // Inline function re-created every render — bad for memoized children
  const handleClick = () => {
    console.log("clicked");
  };

  // Context value is a new object every render — re-renders ALL consumers
  return (
    <ThemeContext.Provider value={{ theme: "dark", count }}>
      <div>
        <h2>Unnecessary Re-renders</h2>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <ExpensiveChild style={style} options={options} onClick={handleClick} />
        <ContextConsumer />
      </div>
    </ThemeContext.Provider>
  );
}

function ExpensiveChild({ style, options, onClick }) {
  console.log("ExpensiveChild rendered!");
  return (
    <div style={style} onClick={onClick}>
      Options: {options.join(", ")}
    </div>
  );
}

function ContextConsumer() {
  const { theme } = useContext(ThemeContext);
  console.log("ContextConsumer rendered!");
  return <p>Theme: {theme}</p>;
}
