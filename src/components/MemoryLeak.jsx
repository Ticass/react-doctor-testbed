import { useState, useEffect } from "react";

// BUG: Missing cleanup in useEffect — memory leak from intervals & subscriptions
export default function MemoryLeak() {
  const [seconds, setSeconds] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Interval without cleanup
  useEffect(() => {
    setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    // Missing: return () => clearInterval(id)
  }, []);

  // Event listener without cleanup
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    // Missing: return () => window.removeEventListener("resize", handler)
  }, []);

  // Fetch without abort controller — state update on unmounted component
  useEffect(() => {
    let mounted = true; // declared but not used for guarding
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((r) => r.json())
      .then((data) => {
        // No check for mounted — potential state update after unmount
        console.log("Fetched:", data.title);
      });
  }, []);

  return (
    <div>
      <h2>Memory Leaks</h2>
      <p>Timer: {seconds}s</p>
      <p>Window width: {windowWidth}px</p>
    </div>
  );
}
