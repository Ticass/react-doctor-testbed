// BUG: Invalid DOM nesting - React warns about this in development
export default function InvalidDomNesting() {
  return (
    <div>
      <h2>Invalid DOM Nesting</h2>

      <p>
        Paragraph wrapper
        <div>This div is incorrectly nested inside a paragraph.</div>
      </p>

      <table border="1">
        <tr>
          <div>This div cannot be a direct child of a table row.</div>
        </tr>
      </table>
    </div>
  );
}
