import { useState, useEffect } from 'react'

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

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

    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos