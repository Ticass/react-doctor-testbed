import { useState, useEffect, useCallback, useMemo } from "react";

// BUG: Missing dependencies in useEffect / useCallback / useMemo
export default function MissingDeps() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  // Missing `query` and `page` in dependency array
  useEffect(() => {
    console.log("Searching for:", query, "page:", page);
    setResults([`Result for "${query}" p${page}`]);
  }, []); // should be [query, page]

  // useCallback missing dep
  const handleSearch = useCallback(() => {
    console.log("Searching:", query);
    setResults([query]);
  }, []); // should be [query]

  // useMemo missing dep
  const summary = useMemo(() => {
    return `Showing ${results.length} results for "${query}"`;
  }, [results]); // should also include query

  return (
    <div>
      <h2>Missing Dependencies</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setPage((p) => p + 1)}>Next Page ({page})</button>
      <p>{summary}</p>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
