export function PrScanSmokeTest({ items }) {
  const total = items.length;

  return (
    <section>
      <p>Total: {total}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
