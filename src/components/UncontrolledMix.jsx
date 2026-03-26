import { useState, useRef } from "react";

// BUG: Mixing controlled and uncontrolled inputs
export default function UncontrolledMix() {
  const [name, setName] = useState(undefined); // starts undefined → uncontrolled
  const [email, setEmail] = useState("test@example.com");

  // Switching from uncontrolled (undefined) to controlled (string)
  // React will warn about this
  const handleNameChange = (e) => {
    setName(e.target.value); // now it's controlled
  };

  // Setting value without onChange — read-only input without readOnly prop
  return (
    <div>
      <h2>Controlled / Uncontrolled Mix</h2>

      {/* Switches from uncontrolled to controlled */}
      <input value={name} onChange={handleNameChange} placeholder="Name" />

      {/* value without onChange — locked input, no readOnly prop */}
      <input value={email} placeholder="Email (locked)" />

      {/* defaultValue + value together — contradictory */}
      <input defaultValue="default" value={name || ""} onChange={handleNameChange} />
    </div>
  );
}
