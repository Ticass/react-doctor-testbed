import { useState } from "react";

// BUG: Various prop-related mistakes
export default function PropErrors() {
  const [items] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);

  return (
    <div>
      <h2>Prop Errors</h2>

      {/* Spreading boolean incorrectly */}
      <input disabled="false" />
      {/* "false" as string is truthy — input is still disabled */}

      {/* Passing string where number expected */}
      <Pagination total="100" perPage="10" />

      {/* Typo in event handler (onClick vs onclick) */}
      <button onclick={() => console.log("click")}>Lowercase onclick</button>

      {/* Unknown DOM props */}
      <div class="wrapper" for="something">
        <p>Should use className and htmlFor</p>
      </div>

      {/* Mutating props */}
      <ChildMutator data={items} />
    </div>
  );
}

function Pagination({ total, perPage }) {
  // String arithmetic — "100" / "10" works but is fragile
  const pages = total / perPage;
  return <p>Pages: {pages} (type: {typeof total})</p>;
}

function ChildMutator({ data }) {
  // BUG: Mutating parent's prop directly
  const sort = () => {
    data.sort((a, b) => a.name.localeCompare(b.name));
    data[0].name = "MUTATED";
    console.log("Mutated parent data:", data);
  };

  return (
    <div>
      <button onClick={sort}>Sort & Mutate Props</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
