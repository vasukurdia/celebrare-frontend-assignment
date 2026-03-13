/**
 * ErrorMessage — Shown when the API fetch fails.
 * Props:
 *  - message: string — the error detail to display
 */
const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
    <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-rose"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>
    <h2 className="font-display text-xl font-bold text-ink">Something went wrong</h2>
    <p className="text-muted text-sm max-w-sm">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-2 px-5 py-2 bg-rose text-white rounded-full text-sm font-medium hover:bg-rose-dark transition-colors"
    >
      Try again
    </button>
  </div>
)

export default ErrorMessage