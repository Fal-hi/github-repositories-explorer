import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (username: string) => void }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => onSearch(input)}>Search</button>
    </div>
  );
}
