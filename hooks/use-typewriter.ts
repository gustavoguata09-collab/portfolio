'use client'

import { useState, useEffect } from 'react'

export function useTypewriter(text: string, speed: number = 100) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Digitando
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      } else if (!isDeleting && currentIndex === text.length) {
        // Pausa antes de apagar
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentIndex > 0) {
        // Apagando
        setDisplayedText((prev) => prev.slice(0, -1))
        setCurrentIndex((prev) => prev - 1)
      } else if (isDeleting && currentIndex === 0) {
        // Reinicia o ciclo
        setIsDeleting(false)
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed, isDeleting])

  return displayedText
}
