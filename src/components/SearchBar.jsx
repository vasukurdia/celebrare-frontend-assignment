const SearchBar = ({ value, onChange, resultCount }) => (
  <div className="w-full max-w-xl mx-auto">
    <div className="relative">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-5 h-5 text-muted"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by author name…"
        className="
          w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-transparent
          bg-white shadow-sm text-ink placeholder-muted
          font-body text-sm focus:outline-none focus:border-rose
          transition-all duration-200
        "
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-rose transition-colors"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>

    {/* Result count hint */}
    {value && (
      <p className="text-xs text-muted mt-2 text-center">
        {resultCount === 0
          ? 'No photos match that search'
          : `Showing ${resultCount} photo${resultCount !== 1 ? 's' : ''}`}
      </p>
    )}
  </div>
)

export default SearchBar