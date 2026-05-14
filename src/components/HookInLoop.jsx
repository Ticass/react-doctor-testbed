import { useState } from "react";

// BUG: Hook called inside a loop - also violates Rules of Hooks
export default function HookInLoop() {
  const fields = ["first", "second", "third"];

  return (
    <div>
      <h2>Hook in Loop</h2>
      {fields.map((label) => {
        const [value, setValue] = useState("");

        return (
          <label
            key={label}
            style={{ display: "block", marginBottom: 8 }}
          >
            {label}
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginLeft: 8 }}
            />
          </label>
        );
      })}
    </div>
  );
}
