'use client'
import { useEffect, useRef, useState } from 'react'
import type { Example, Skill } from '../types'
import { STATUS_META, PHASE_META, PROJECTS } from '../types'
import { ExampleForm } from './ExampleForm'
import { PhaseIcon } from './PhaseIcon'

type Props = {
  skill: Skill | null
  canEdit: boolean
  onClose: () => void
  onAddExample: (skillId: string, example: Omit<Example, 'id' | 'addedAt'>) => void
  onUpdateExample: (skillId: string, exampleId: string, updates: Partial<Omit<Example, 'id' | 'addedAt'>>) => void
  onRemoveExample: (skillId: string, exampleId: string) => void
  onReorderExamples: (skillId: string, fromIndex: number, toIndex: number) => void
}

export function ExampleDrawer({ skill, canEdit, onClose, onAddExample, onUpdateExample, onRemoveExample, onReorderExamples }: Props) {
  const dragIndex = useRef<number | null>(null)
  const [dropTarget, setDropTarget] = useState<number | null>(null)

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
  const senMeta = STATUS_META[skill.seniorStatus]

  const growthLevel = skill.advancedStatus !== 'consistently'
    ? { label: 'Advanced - growth area', notes: skill.advancedGrowthNotes }
    : skill.seniorStatus !== 'consistently'
    ? { label: 'Senior - growth area', notes: skill.seniorGrowthNotes }
    : null

  function handleDragStart(index: number) {
    dragIndex.current = index
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDropTarget(index)
  }

  function handleDrop(toIndex: number) {
    if (dragIndex.current !== null && dragIndex.current !== toIndex) {
      onReorderExamples(skill!.id, dragIndex.current, toIndex)
    }
    dragIndex.current = null
    setDropTarget(null)
  }

  function handleDragEnd() {
    dragIndex.current = null
    setDropTarget(null)
  }

  return (
    <>
      <div
        className="fixed inset-0 z-30 transition-opacity"
        style={{ backgroundColor: 'rgba(1,13,45,0.4)' }}
        onClick={onClose}
      />

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
                <PhaseIcon phase={skill.phase} size={16} color="#010D2D" />
                <span className="text-xs font-bold tracking-wide uppercase" style={{ color: '#010D2D' }}>
                  {phaseMeta.label}
                </span>
              </div>
              <h2 className="text-lg font-bold" style={{ color: '#010D2D', fontFamily: 'Manrope, sans-serif' }}>
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

          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(1,13,45,0.6)' }}>
            {skill.summary}
          </p>

          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { label: 'Intermediate', meta: intMeta },
              { label: 'Advanced', meta: advMeta },
              { label: 'Senior', meta: senMeta },
            ].map(({ label, meta }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: 'rgba(1,13,45,0.4)' }}>{label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`}>{meta.label}</span>
              </div>
            ))}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs" style={{ color: 'rgba(1,13,45,0.4)' }}>Expert</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium text-slate-400 bg-slate-100">Not Yet</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {growthLevel?.notes && growthLevel.notes.length > 0 && (
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(1,13,45,0.04)', border: '1px solid rgba(1,13,45,0.1)' }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: '#010D2D' }}>{growthLevel.label}</p>
              <ul className="space-y-1">
                {growthLevel.notes.map((note, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'rgba(1,13,45,0.7)' }}>
                    <span style={{ color: '#DA61F1', flexShrink: 0 }}>-</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="text-sm font-bold" style={{ color: '#010D2D' }}>
            Examples ({skill.examples.length})
          </h3>

          {skill.examples.length === 0 && (
            <p className="text-sm italic py-2" style={{ color: 'rgba(1,13,45,0.35)' }}>
              No examples yet. Add evidence below to support your banding assessment.
            </p>
          )}

          {skill.examples.map((ex, index) => (
            <div
              key={ex.id}
              draggable={canEdit}
              onDragStart={canEdit ? () => handleDragStart(index) : undefined}
              onDragOver={canEdit ? e => handleDragOver(e, index) : undefined}
              onDrop={canEdit ? () => handleDrop(index) : undefined}
              onDragEnd={canEdit ? handleDragEnd : undefined}
              style={{
                opacity: dragIndex.current === index ? 0.4 : 1,
                outline: canEdit && dropTarget === index && dragIndex.current !== index
                  ? '2px solid rgba(218,97,241,0.5)'
                  : 'none',
                borderRadius: '12px',
                transition: 'opacity 0.15s',
              }}
            >
              <ExampleCard
                example={ex}
                canEdit={canEdit}
                onRemove={() => onRemoveExample(skill.id, ex.id)}
                onUpdate={updates => onUpdateExample(skill.id, ex.id, updates)}
              />
            </div>
          ))}

          {canEdit && <ExampleForm onAdd={example => onAddExample(skill.id, example)} />}
        </div>
      </div>
    </>
  )
}

type CardProps = {
  example: Example
  canEdit: boolean
  onRemove: () => void
  onUpdate: (updates: Partial<Omit<Example, 'id' | 'addedAt'>>) => void
}

const inputStyle = {
  width: '100%',
  fontSize: '0.8125rem',
  border: '1px solid rgba(1,13,45,0.15)',
  borderRadius: '6px',
  padding: '6px 10px',
  backgroundColor: '#FAF8F6',
  color: '#010D2D',
  outline: 'none',
  fontFamily: 'Manrope, sans-serif',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  color: 'rgba(1,13,45,0.5)',
  display: 'block',
  marginBottom: '3px',
  fontFamily: 'Manrope, sans-serif',
}

function NotesDisplay({ notes }: { notes: string }) {
  return (
    <div className="text-xs leading-relaxed mt-1 space-y-0.5" style={{ color: 'rgba(1,13,45,0.6)' }}>
      {notes.split('\n').map((line, i) => {
        const match = line.match(/^([•·\-*])\s*(.+)$/)
        if (match) {
          return (
            <div key={i} className="flex gap-1.5">
              <span style={{ flexShrink: 0, marginTop: '0px' }}>{match[1]}</span>
              <span>{match[2]}</span>
            </div>
          )
        }
        return <p key={i}>{line || '\u00A0'}</p>
      })}
    </div>
  )
}

function ExampleCard({ example, canEdit, onRemove, onUpdate }: CardProps) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: example.title,
    notes: example.notes,
    url: example.url ?? '',
    project: example.project,
  })

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    onUpdate({
      title: form.title.trim(),
      notes: form.notes.trim(),
      url: form.url.trim() || undefined,
      project: form.project,
    })
    setEditing(false)
  }

  function handleCancel() {
    setForm({ title: example.title, notes: example.notes, url: example.url ?? '', project: example.project })
    setEditing(false)
  }

  if (editing) {
    return (
      <form
        onSubmit={handleSave}
        className="rounded-xl p-4 space-y-3"
        style={{ backgroundColor: '#FAF8F6', border: '1px solid rgba(218,97,241,0.3)' }}
      >
        <div>
          <label style={labelStyle}>Title *</label>
          <input type="text" value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle}>Notes</label>
          <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'none' as const }} />
        </div>
        <div>
          <label style={labelStyle}>Link (Confluence, Figma, Miro, Jira etc)</label>
          <input type="url" value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Project</label>
          <select value={form.project} onChange={e => set('project', e.target.value)} style={inputStyle}>
            <option value="">Select project...</option>
            {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" className="flex-1 text-xs font-bold py-2 rounded-lg cursor-pointer hover:opacity-90" style={{ backgroundColor: '#010D2D', color: '#FAF8F6' }}>
            Save
          </button>
          <button type="button" onClick={handleCancel} className="px-4 text-xs font-medium rounded-lg cursor-pointer hover:opacity-70" style={{ border: '1px solid rgba(1,13,45,0.2)', color: '#010D2D', backgroundColor: 'transparent' }}>
            Cancel
          </button>
          <button type="button" onClick={onRemove} className="px-3 text-xs font-medium rounded-lg cursor-pointer hover:opacity-70" style={{ border: '1px solid rgba(220,38,38,0.3)', color: 'rgb(185,28,28)', backgroundColor: 'transparent' }}>
            Delete
          </button>
        </div>
      </form>
    )
  }

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-150 group ${canEdit ? 'cursor-pointer' : ''}`}
      style={{ backgroundColor: '#FAF8F6', border: '1px solid rgba(1,13,45,0.1)' }}
      onClick={canEdit ? () => setEditing(true) : undefined}
      onMouseEnter={canEdit ? e => (e.currentTarget.style.borderColor = 'rgba(218,97,241,0.35)') : undefined}
      onMouseLeave={canEdit ? e => (e.currentTarget.style.borderColor = 'rgba(1,13,45,0.1)') : undefined}
      title={canEdit ? 'Click to edit · Drag to reorder' : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold leading-snug mb-1" style={{ color: '#010D2D' }}>
          {example.url ? (
            <a
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-70"
              style={{ color: '#DA61F1' }}
              onClick={e => e.stopPropagation()}
            >
              {example.title} ↗
            </a>
          ) : (
            example.title
          )}
        </h4>
        {canEdit && (
          <span className="text-xs opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0 select-none" style={{ color: '#010D2D' }}>
            ⠿
          </span>
        )}
      </div>

      {example.project && (
        <span
          className="inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-2"
          style={{ backgroundColor: 'rgba(1,13,45,0.07)', color: '#010D2D' }}
        >
          {example.project}
        </span>
      )}

      {example.notes && <NotesDisplay notes={example.notes} />}

      <p className="text-xs mt-2" style={{ color: 'rgba(1,13,45,0.3)' }}>
        Added {new Date(example.addedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  )
}
