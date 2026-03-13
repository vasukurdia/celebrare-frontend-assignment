import { useState, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { useFavourites } from '../context/FavouritesContext'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

/**
 * Gallery — The main content component.
 *
 * Responsibilities:
 *  1. Use useFetchPhotos hook to get data (never fetches directly)
 *  2. Manage the search query string via useState
 *  3. Filter photos with useMemo so the computation only re-runs when
 *     photos or query actually change (not on every render)
 *  4. Wrap the search handler in useCallback so the SearchBar never
 *     gets a new function reference unnecessarily, preventing re-renders
 */
const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites } = useFavourites()

  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'favourites'

  // ------------------------------------------------------------------
  // useCallback: memoises the handler so the same function reference
  // is passed to SearchBar on every render.
  // Without this, SearchBar would receive a brand-new function on every
  // Gallery re-render, causing unnecessary child re-renders.
  // ------------------------------------------------------------------
  const handleSearchChange = useCallback((value) => {
    setQuery(value)
  }, []) // no dependencies — the function never needs to change

  // ------------------------------------------------------------------
  // useMemo: the filtered list is derived (expensive) from two inputs.
  // Without useMemo, filtering would re-run on EVERY render — even
  // renders triggered by toggling a favourite — which is wasteful.
  // With useMemo, the computation only re-runs when `photos` or `query`
  // actually changes.
  // ------------------------------------------------------------------
  const filteredPhotos = useMemo(() => {
    const base = activeTab === 'favourites'
      ? photos.filter((p) => favourites.has(String(p.id)))
      : photos

    if (!query.trim()) return base

    const lower = query.toLowerCase()
    return base.filter((photo) =>
      photo.author.toLowerCase().includes(lower)
    )
  }, [photos, query, activeTab, favourites])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <section className="w-full">
      {/* Tab + Search row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1 shadow-sm shrink-0">
          <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
            All Photos
          </TabButton>
          <TabButton active={activeTab === 'favourites'} onClick={() => setActiveTab('favourites')}>
            ♥ Favourites
            {favourites.size > 0 && (
              <span className="ml-1.5 text-xs bg-rose text-white rounded-full px-1.5 py-0.5">
                {favourites.size}
              </span>
            )}
          </TabButton>
        </div>

        {/* Search */}
        <div className="w-full sm:max-w-sm">
          <SearchBar
            value={query}
            onChange={handleSearchChange}
            resultCount={filteredPhotos.length}
          />
        </div>
      </div>

      {/* Empty state */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-24 text-muted">
          <p className="font-display italic text-2xl mb-2">Nothing here yet</p>
          <p className="text-sm">
            {activeTab === 'favourites'
              ? 'Heart some photos to see them here.'
              : 'No authors match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </section>
  )
}

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
      ${active
        ? 'bg-ink text-cream shadow-sm'
        : 'text-muted hover:text-ink'
      }
    `}
  >
    {children}
  </button>
)

export default Gallery