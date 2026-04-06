import type { Skill } from '../types'
import { PHASE_META } from '../types'

type Props = {
  skill: Skill
  onClick: () => void
}

const GREEN = 'text-emerald-700 bg-emerald-100'
const GREY = 'text-slate-400 bg-slate-100'

export function SkillCard({ skill, onClick }: Props) {
  const meta = PHASE_META[skill.phase]
  const exCount = skill.examples.length

  const intReached = skill.intermediateStatus === 'consistently'
  const advReached = skill.advancedStatus === 'consistently'
  const seniorReached = skill.seniorStatus === 'consistently'

  const levels = [
    { label: 'Intermediate', reached: intReached },
    { label: 'Advanced',     reached: advReached },
    { label: 'Senior',       reached: seniorReached },
    { label: 'Expert',       reached: false },
  ]

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer group"
      style={{
        backgroundColor: '#FAF8F6',
        borderColor: 'rgba(1,13,45,0.1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(218,97,241,0.4)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(218,97,241,0.12)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(1,13,45,0.1)'
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-bold leading-snug" style={{ color: '#010D2D' }}>
          {skill.name}
        </h3>
        {exCount > 0 ? (
          <span
            className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: meta.bgStyle.backgroundColor as string, color: '#010D2D', border: `1px solid ${meta.bgStyle.borderColor as string}` }}
          >
            {exCount} {exCount === 1 ? 'example' : 'examples'}
          </span>
        ) : (
          <span
            className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(1,13,45,0.04)', color: 'rgba(1,13,45,0.35)', border: '1px solid rgba(1,13,45,0.08)' }}
          >
            + add examples
          </span>
        )}
      </div>

      {/* Summary */}
      <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: 'rgba(1,13,45,0.55)' }}>
        {skill.summary}
      </p>

      {/* Level badges */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {levels.map(({ label, reached }) => (
          <span key={label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${reached ? GREEN : GREY}`}>
            {label} {reached ? '✓' : '○'}
          </span>
        ))}
      </div>

      {/* View/add prompt */}
      <div className="text-xs flex items-center gap-1 mt-1 transition-colors" style={{ color: 'rgba(218,97,241,0.7)' }}>
        <span>{exCount > 0 ? 'View & add examples' : 'Click to add evidence'}</span>
        <span>→</span>
      </div>
    </button>
  )
}
