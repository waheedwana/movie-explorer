interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function SearchBar({
  value,
  onChange,
  placeholder = "Search movies...",
  disabled,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Search movie"
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="clear-btn"
          aria-label="Clear search"
          type="button"
          onClick={() => onChange("")}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
