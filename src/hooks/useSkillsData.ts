import { useState, useEffect, useCallback, useRef } from 'react'
import type { Skill, Example } from '../types'
import { INITIAL_SKILLS } from '../data/skills'

type ExamplesMap = Record<string, Example[]>

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
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
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
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      fetch('/api/examples', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toExamplesMap(skills)),
      }).catch(console.error)
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

  const moveExample = useCallback((fromSkillId: string, exampleId: string, toSkillId: string) => {
    setSkills(prev => {
      const example = prev.find(s => s.id === fromSkillId)?.examples.find(e => e.id === exampleId)
      if (!example) return prev
      return prev.map(skill => {
        if (skill.id === fromSkillId) return { ...skill, examples: skill.examples.filter(e => e.id !== exampleId) }
        if (skill.id === toSkillId) return { ...skill, examples: [...skill.examples, example] }
        return skill
      })
    })
  }, [])

  return { skills, addExample, updateExample, removeExample, moveExample }
}
