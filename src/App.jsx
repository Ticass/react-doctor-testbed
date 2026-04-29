import { useState } from "react";
import MissingKeys from "./components/MissingKeys";
import DirectStateMutation from "./components/DirectStateMutation";
import ConditionalHooks from "./components/ConditionalHooks";
import MemoryLeak from "./components/MemoryLeak";
import MissingDeps from "./components/MissingDeps";
import UnnecessaryRerenders from "./components/UnnecessaryRerenders";
import BadEffects from "./components/BadEffects";
import PropErrors from "./components/PropErrors";
import SetStateInRender from "./components/SetStateInRender";
import StaleClosures from "./components/StaleClosures";
import UncontrolledMix from "./components/UncontrolledMix";
import HookInLoop from "./components/HookInLoop";
import InvalidDomNesting from "./components/InvalidDomNesting";
import NestedComponent from "./components/NestedComponent";
import "./App.css";

const components = {
  MissingKeys,
  DirectStateMutation,
  ConditionalHooks,
  MemoryLeak,
  MissingDeps,
  UnnecessaryRerenders,
  BadEffects,
  PropErrors,
  SetStateInRender,
  StaleClosures,
  UncontrolledMix,
  HookInLoop,
  InvalidDomNesting,
  NestedComponent,
};

export default function App() {
  const [active, setActive] = useState(Object.keys(components));
  const [isAdmin, setIsAdmin] = useState(false);

  const toggle = (name) => {
    setActive((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>React Doctor Testbed</h1>
      <p style={{ color: "#888" }}>
        Each component below contains intentional React errors and warnings.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {Object.keys(components).map((name) => (
          <button
            key={name}
            onClick={() => toggle(name)}
            style={{
              padding: "4px 12px",
              background: active.includes(name) ? "#4f46e5" : "#ddd",
              color: active.includes(name) ? "#fff" : "#333",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {name}
          </button>
        ))}
        <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          isAdmin
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {active.map((name) => {
          const Component = components[name];
          const props = name === "ConditionalHooks" ? { isAdmin } : {};
          return (
            <div
              key={name}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <Component {...props} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
