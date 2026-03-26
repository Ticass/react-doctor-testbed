import { useState, useEffect, useMemo } from "react";

// BUG: Hooks called conditionally — violates Rules of Hooks
export default function ConditionalHooks({ isAdmin }) {
  const [count, setCount] = useState(0);

  // Conditional hook — will break on toggle
  if (isAdmin) {
    const [adminData, setAdminData] = useState("secret");
    useEffect(() => {
      console.log("Admin effect running, data:", adminData);
      setAdminData("loaded-secret");
    }, []);
  }

  // Hook inside early return path
  if (count > 10) {
    return <p>Count exceeded</p>;
  }

  // This hook is after a conditional return — order changes
  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div>
      <h2>Conditional Hooks</h2>
      <p>Count: {count} (doubled: {doubled})</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
