import { useState, useEffect } from 'react'

/**
 * useFetchPhotos — Custom hook to fetch photos from the Picsum API.
 * Returns: { photos, loading, error }
 *
 * - photos: array of photo objects from the API
 * - loading: boolean, true while the request is in flight
 * - error: string | null, set if the fetch fails
 *
 * If the API is unreachable or returns a non-OK response, `error` is set
 * and `photos` stays as an empty array so the UI can show an error message.
 */
const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false // prevent state updates if component unmounts

    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://picsum.photos/v2/list?limit=30')

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (!cancelled) {
          setPhotos(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch photos. Please check your connection.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    // Cleanup function — if the component unmounts before fetch completes,
    // we set `cancelled = true` to avoid calling setState on an unmounted component.
    return () => {
      cancelled = true
    }
  }, []) // empty array = run once on mount only

  return { photos, loading, error }
}

export default useFetchPhotos