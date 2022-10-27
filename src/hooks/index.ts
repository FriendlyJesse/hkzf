import { useState } from 'react'

export function useCurrentCity () {
  const [currentCity, setCurrentCity] = useState({})

  function saveCurrentCity (data: {}) {
    setCurrentCity(data)
  }

  return [currentCity, saveCurrentCity]
}