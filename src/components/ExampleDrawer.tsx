import { useEffect } from 'react'
import type { Example, Skill } from '../types'
import { STATUS_META, PHASE_META } from '../types'
import { ExampleForm } from './ExampleForm'

type Props = {
  skill: Skill | null
  onClose: () => void
  onAddExample: (skillId: string, example: Omit<Example, 'id' | 'addedAt'>) => void
  onRemoveExample: (skillId: string, exampleId: string) => void
}

export function ExampleDrawer({ skill, onClose, onAddExample, onRemoveExample }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!skill) return null

  const phaseMeta = PHASE_META[skill.phase]
  const intMeta = STATUS_META[skill.intermediateStatus]
  const advMeta = STATUS_META[skill.advancedStatus]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 transition-opacity"
        style={{ backgroundColor: 'rgba(1,13,45,0.4)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-lg z-40 shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: '#FAF8F6' }}
      >
        {/* Header */}
        <div
          className="p-5 border-b"
          style={{ ...phaseMeta.bgStyle, borderColor: 'rgba(1,13,45,0.1)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{phaseMeta.icon}</span>
                <span
                  className="text-xs font-bold tracking-wide uppercase"
                  style={{ color: '#010D2D' }}
                >
                  {phaseMeta.label}
                </span>
              </div>
              <h2
                className="text-lg font-bold"
                style={{ color: '#010D2D', fontFamily: 'Manrope, sans-serif' }}
              >
                {skill.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none mt-0.5 cursor-pointer transition-opacity hover:opacity-60"
              style={{ color: '#010D2D' }}
            >
              ×
            </button>
          </div>

          <p
            className="text-sm mt-2 leading-relaxed"
            style={{ color: 'rgba(1,13,45,0.6)' }}
          >
            {skill.summary}
          </p>

          {/* Status badges */}
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs" style={{ color: 'rgba(1,13,45,0.4)' }}>Intermediate</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${intMeta.color}`}>
                {intMeta.label}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs" style={{ color: 'rgba(1,13,45,0.4)' }}>Advanced</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${advMeta.color}`}>
                {advMeta.label}
              </span>
            </div>
            {skill.seniorIndicators && (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'rgba(1,13,45,0.4)' }}>Senior</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: '#010D2D', color: '#DA61F1' }}
                >
                  Evidenced
                </span>
              </div>
            )}
          </div>

          {/* Senior indicators */}
          {skill.seniorIndicators && (
            <div
              className="mt-3 p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(1,13,45,0.08)', border: '1px solid rgba(1,13,45,0.15)' }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: '#010D2D' }}>Senior indicator</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(1,13,45,0.7)' }}>{skill.seniorIndicators}</p>
            </div>
          )}
        </div>

        {/* Examples list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Growth area note */}
          {skill.growthAreaNote && (
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(1,13,45,0.04)', border: '1px solid rgba(1,13,45,0.1)' }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: '#010D2D' }}>Growth area</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(1,13,45,0.7)' }}>{skill.growthAreaNote}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold" style={{ color: '#010D2D' }}>
              Examples ({skill.examples.length})
            </h3>
          </div>

          {skill.examples.length === 0 && (
            <p className="text-sm italic py-2" style={{ color: 'rgba(1,13,45,0.35)' }}>
              No examples yet. Add evidence below to support your banding assessment.
            </p>
          )}

          {skill.examples.map(ex => (
            <ExampleCard
              key={ex.id}
              example={ex}
              onRemove={() => onRemoveExample(skill.id, ex.id)}
            />
          ))}

          <ExampleForm
            onAdd={example => onAddExample(skill.id, example)}
          />
        </div>
      </div>
    </>
  )
}

function ExampleCard({ example, onRemove }: { example: Example; onRemove: () => void }) {
  return (
    <div
      className="rounded-xl p-4 relative group"
      style={{ backgroundColor: '#FAF8F6', border: '1px solid rgba(1,13,45,0.1)' }}
    >
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-xl leading-none opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:opacity-70"
        style={{ color: 'rgba(1,13,45,0.3)' }}
        title="Remove example"
      >
        ×
      </button>

      {/* Image thumbnail */}
      {example.imageUrl && (
        <a href={example.url || example.imageUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={example.imageUrl}
            alt={example.title}
            className="w-full rounded-lg mb-3 max-h-32 object-cover transition-opacity hover:opacity-90"
            style={{ border: '1px solid rgba(1,13,45,0.08)' }}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </a>
      )}

      {/* Title */}
      <h4 className="text-sm font-bold leading-snug mb-1" style={{ color: '#010D2D' }}>
        {example.url ? (
          <a
            href={example.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-70"
            style={{ color: '#DA61F1' }}
          >
            {example.title} ↗
          </a>
        ) : (
          example.title
        )}
      </h4>

      {/* Project tag */}
      {example.project && (
        <span
          className="inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-2"
          style={{ backgroundColor: 'rgba(1,13,45,0.07)', color: '#010D2D' }}
        >
          {example.project}
        </span>
      )}

      {/* Notes */}
      {example.notes && (
        <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(1,13,45,0.6)' }}>
          {example.notes}
        </p>
      )}

      {/* Date */}
      <p className="text-xs mt-2" style={{ color: 'rgba(1,13,45,0.3)' }}>
        Added {new Date(example.addedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  )
}
