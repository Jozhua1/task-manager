function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search tasks by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search tasks"
    />
  );
}

export default SearchBar;
