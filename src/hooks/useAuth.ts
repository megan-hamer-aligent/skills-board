import { useState, useEffect } from 'react'

const SESSION_KEY = 'skills-board-edit-unlocked'

export function useAuth() {
  const [canEdit, setCanEdit] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  // Restore from sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setCanEdit(true)
    }
  }, [])

  async function unlock(password: string) {
    setChecking(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, '1')
        setCanEdit(true)
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Connection error')
    } finally {
      setChecking(false)
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY)
    setCanEdit(false)
  }

  return { canEdit, unlock, lock, checking, error }
}
