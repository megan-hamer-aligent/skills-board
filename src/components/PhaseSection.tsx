import { useEffect, useRef } from 'react'
import type { Phase, Skill } from '../types'
import { PHASE_META } from '../types'
import { SkillCard } from './SkillCard'

type Props = {
  phase: Phase
  skills: Skill[]
  isActive: boolean
  onSelectSkill: (skill: Skill) => void
}

export function PhaseSection({ phase, skills, isActive, onSelectSkill }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const meta = PHASE_META[phase]

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isActive])

  return (
    <div ref={ref} className="mb-12" id={`phase-${phase}`}>
      {/* Phase heading */}
      <div
        className="flex items-center gap-3 mb-6 p-4 rounded-xl border"
        style={meta.bgStyle}
      >
        <span className="text-3xl">{meta.icon}</span>
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: '#010D2D', fontFamily: 'Manrope, sans-serif' }}
          >
            {meta.label}
          </h2>
          <p className="text-xs" style={{ color: 'rgba(1,13,45,0.5)' }}>
            {skills.length} skills in this phase
          </p>
        </div>
        <div className="ml-auto flex gap-1.5 items-center">
          {skills.map(s => (
            <div
              key={s.id}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: s.examples.length > 0 ? '#DA61F1' : 'rgba(1,13,45,0.15)' }}
              title={s.name}
            />
          ))}
        </div>
      </div>

      {/* Skill cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} onClick={() => onSelectSkill(skill)} />
        ))}
      </div>
    </div>
  )
}
