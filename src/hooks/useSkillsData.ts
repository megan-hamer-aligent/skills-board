import { useState, useEffect, useCallback, useRef } from 'react'
import type { Skill, Example } from '../types'
import { INITIAL_SKILLS } from '../data/skills'

type ExamplesMap = Record<string, Example[]>

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function mergeExamples(examples: ExamplesMap): Skill[] {
  return INITIAL_SKILLS.map(skill => ({
    ...skill,
    examples: examples[skill.id] ?? [],
  }))
}

function toExamplesMap(skills: Skill[]): ExamplesMap {
  const map: ExamplesMap = {}
  for (const skill of skills) {
    if (skill.examples.length > 0) map[skill.id] = skill.examples
  }
  return map
}

export function useSkillsData() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS)
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Skip the first save trigger (initial load) to avoid overwriting Turso with empty state
  const skipNextSave = useRef(true)

  // Load from API on mount
  useEffect(() => {
    fetch('/api/examples')
      .then(r => r.json())
      .then((data: ExamplesMap) => {
        setSkills(mergeExamples(data))
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  // Debounced save to API (600ms) — skips the initial load trigger
  useEffect(() => {
    if (!loaded) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }
    setSaveStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      fetch('/api/examples', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toExamplesMap(skills)),
      })
        .then(r => {
          if (!r.ok) throw new Error('save failed')
          setSaveStatus('saved')
          if (savedTimer.current) clearTimeout(savedTimer.current)
          savedTimer.current = setTimeout(() => setSaveStatus('idle'), 2000)
        })
        .catch(() => setSaveStatus('error'))
    }, 600)
  }, [skills, loaded])

  const addExample = useCallback((skillId: string, example: Omit<Example, 'id' | 'addedAt'>) => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? {
              ...skill,
              examples: [
                ...skill.examples,
                { ...example, id: crypto.randomUUID(), addedAt: new Date().toISOString() },
              ],
            }
          : skill
      )
    )
  }, [])

  const updateExample = useCallback((skillId: string, exampleId: string, updates: Partial<Omit<Example, 'id' | 'addedAt'>>) => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? { ...skill, examples: skill.examples.map(e => e.id === exampleId ? { ...e, ...updates } : e) }
          : skill
      )
    )
  }, [])

  const removeExample = useCallback((skillId: string, exampleId: string) => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === skillId
          ? { ...skill, examples: skill.examples.filter(e => e.id !== exampleId) }
          : skill
      )
    )
  }, [])

  const reorderExamples = useCallback((skillId: string, fromIndex: number, toIndex: number) => {
    setSkills(prev =>
      prev.map(skill => {
        if (skill.id !== skillId) return skill
        const examples = [...skill.examples]
        const [moved] = examples.splice(fromIndex, 1)
        examples.splice(toIndex, 0, moved)
        return { ...skill, examples }
      })
    )
  }, [])

  return { skills, saveStatus, addExample, updateExample, removeExample, reorderExamples }
}
