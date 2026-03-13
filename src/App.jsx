import { FavouritesProvider } from './context/FavouritesContext'
import Gallery from './components/Gallery'

const App = () => {
  return (
    <FavouritesProvider>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-ink tracking-tight">
              GalleryLite
            </h1>
            <span className="text-muted text-sm font-light hidden sm:block">
              — a photo gallery
            </span>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="mb-10">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
              Curated <em className="text-rose not-italic">moments</em>
            </h2>
            <p className="text-muted mt-2 text-sm sm:text-base max-w-md">
              Browse 30 photos from the Picsum collection. Heart the ones you love — they'll be waiting when you return.
            </p>
          </div>

          <Gallery />
        </main>

        {/* Footer */}
        <footer className="text-center py-10 text-muted text-xs border-t border-black/5 mt-16">
          Photos via{' '}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-rose transition-colors"
          >
            Picsum Photos
          </a>
        </footer>
      </div>
    </FavouritesProvider>
  )
}

export default App