import { useFavourites } from '../context/FavouritesContext'

/**
 * PhotoCard — Renders a single photo with author name and heart button.
 *
 * Props:
 *  - photo: { id, author, width, height, download_url }
 */
const PhotoCard = ({ photo }) => {
  const { favourites, toggleFavourite } = useFavourites()
  const isFav = favourites.has(String(photo.id))

  // Build a 300×200 image URL from Picsum using the photo id
  const imgSrc = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md card-hover animate-fadeIn"
      style={{ animationDelay: `${(photo.id % 10) * 40}ms` }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imgSrc}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Favourite badge overlay */}
        {isFav && (
          <div className="absolute top-3 left-3 bg-rose text-white text-xs font-medium px-2 py-1 rounded-full">
            Favourited
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest mb-0.5">Author</p>
          <p className="font-display text-sm font-semibold text-ink truncate max-w-[160px]">
            {photo.author}
          </p>
        </div>

        {/* Heart button */}
        <button
          onClick={() => toggleFavourite(String(photo.id))}
          aria-label={isFav ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
            ${isFav
              ? 'bg-rose border-rose text-white animate-heartPop'
              : 'bg-transparent border-gray-200 text-gray-300 hover:border-rose hover:text-rose'
            }
          `}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>
    </article>
  )
}

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 2}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
)

export default PhotoCard