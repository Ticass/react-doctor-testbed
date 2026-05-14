import { useState, useEffect } from "react";

export function PrScanSmokeTest({ items }) {
  const [count, setCount] = useState(0);

  // intentional: missing dep in dep array
  useEffect(() => {
    console.log(items.length);
  }, []);

  return (
    <ul>
      {/* intentional: missing key prop */}
      {items.map((item) => <li>{item}</li>)}
    </ul>
  );
}
