import { useState } from "react";

// BUG: Missing key prop in list rendering
// BUG: Using array index as key
export default function MissingKeys() {
  const [items, setItems] = useState([
    { id: 1, text: "Apple" },
    { id: 2, text: "Banana" },
    { id: 3, text: "Cherry" },
  ]);

  const addItem = () => {
    setItems([
      { id: Date.now(), text: "New fruit " + Math.random().toFixed(2) },
      ...items,
    ]);
  };

  return (
    <div>
      <h2>Missing / Bad Keys</h2>
      <button onClick={addItem}>Add Item (prepend)</button>

      {/* No key at all */}
      <h3>No key:</h3>
      <ul>
        {items.map((item) => (
          <li>{item.text}</li>
        ))}
      </ul>

      {/* Index as key — problematic when list is reordered */}
      <h3>Index as key:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input defaultValue={item.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}
