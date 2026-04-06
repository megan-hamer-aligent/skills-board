import type { Phase, Skill } from '../types'
import { PHASE_META } from '../types'
import { PhaseIcon } from './PhaseIcon'

const PHASES: Phase[] = ['discover', 'plan', 'deliver', 'launch', 'grow']

type Props = {
  skills: Skill[]
  activePhase: Phase | null
  onSelectPhase: (phase: Phase) => void
}

export function JourneyMap({ skills, activePhase, onSelectPhase }: Props) {
  return (
    <div className="sticky top-0 z-20 shadow-sm border-b" style={{ backgroundColor: '#FAF8F6', borderColor: 'rgba(1,13,45,0.1)' }}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
          {PHASES.map((phase, i) => {
            const meta = PHASE_META[phase]
            const phaseSkills = skills.filter(s => s.phase === phase)
            const withExamples = phaseSkills.filter(s => s.examples.length > 0).length
            const isActive = activePhase === phase

            return (
              <div key={phase} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => onSelectPhase(phase)}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-200 min-w-[80px] cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: '#DA61F1', borderColor: '#DA61F1', transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(218,97,241,0.3)' }
                      : { ...meta.bgStyle, border: `1px solid ${(meta.bgStyle.borderColor as string)}` }
                  }
                >
                  <PhaseIcon phase={phase} size={22} color={isActive ? '#FAF8F6' : '#010D2D'} />
                  <span
                    className="text-xs font-bold whitespace-nowrap"
                    style={{ color: isActive ? '#FAF8F6' : '#010D2D' }}
                  >
                    {meta.label}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: isActive ? 'rgba(250,248,246,0.7)' : 'rgba(1,13,45,0.4)' }}
                  >
                    {withExamples}/{phaseSkills.length}
                  </span>
                </button>

                {i < PHASES.length - 1 && (
                  <span className="text-xs" style={{ color: 'rgba(1,13,45,0.25)' }}>›</span>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-xs mt-1.5" style={{ color: 'rgba(1,13,45,0.35)', fontFamily: 'Manrope, sans-serif' }}>
          Your ecommerce delivery journey · click a phase to jump to it
        </p>
      </div>
    </div>
  )
}
