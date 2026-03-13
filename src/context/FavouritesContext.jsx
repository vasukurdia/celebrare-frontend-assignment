import { createContext, useContext, useReducer, useEffect } from 'react'

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const next = new Set(state)
      if (next.has(action.payload)) {
        next.delete(action.payload)
      } else {
        next.add(action.payload)
      }
      return next
    }
    case 'LOAD_FAVOURITES': {
      return new Set(action.payload)
    }
    default:
      return state
  }
}

const FavouritesContext = createContext(null)
const STORAGE_KEY = 'photo-gallery-favourites'

const getInitialFavourites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return new Set(JSON.parse(stored))
  } catch {
    
  }
  return new Set()
}

export const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(favouritesReducer, null, getInitialFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favourites]))
    } catch {

    }
  }, [favourites])

  const toggleFavourite = (id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id })
  }

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext)
  if (!ctx) throw new Error('useFavourites must be used within <FavouritesProvider>')
  return ctx
}