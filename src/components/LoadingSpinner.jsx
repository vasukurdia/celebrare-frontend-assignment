/**
 * LoadingSpinner — Shown while photos are being fetched.
 * Uses a CSS-animated SVG ring so no extra library is needed.
 */
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6">
    <div className="relative w-16 h-16">
      <svg
        className="animate-spin w-16 h-16 text-rose"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
    <p className="font-display italic text-muted text-lg">Curating your gallery…</p>
  </div>
)

export default LoadingSpinner