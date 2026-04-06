import { useState } from 'react'
import type { Example } from '../types'
import { PROJECTS } from '../types'

type FormState = Omit<Example, 'id' | 'addedAt'>

const EMPTY: FormState = {
  title: '',
  notes: '',
  url: '',
  project: '',
}

type Props = {
  onAdd: (example: FormState) => void
}

const inputStyle = {
  width: '100%',
  fontSize: '0.875rem',
  border: '1px solid rgba(1,13,45,0.15)',
  borderRadius: '8px',
  padding: '8px 12px',
  backgroundColor: '#FAF8F6',
  color: '#010D2D',
  outline: 'none',
  fontFamily: 'Manrope, sans-serif',
}

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: '700',
  color: 'rgba(1,13,45,0.6)',
  display: 'block',
  marginBottom: '4px',
  fontFamily: 'Manrope, sans-serif',
}

export function ExampleForm({ onAdd }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [open, setOpen] = useState(false)

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({
      title: form.title.trim(),
      notes: form.notes.trim(),
      url: form.url?.trim() || undefined,
      project: form.project,
    })
    setForm(EMPTY)
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
        style={{
          border: '2px dashed rgba(218,97,241,0.3)',
          color: 'rgba(218,97,241,0.7)',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(218,97,241,0.6)'
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(218,97,241,0.04)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(218,97,241,0.3)'
          ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
        }}
      >
        + Add example
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-4 space-y-3"
      style={{ backgroundColor: 'rgba(1,13,45,0.03)', border: '1px solid rgba(1,13,45,0.1)' }}
    >
      <h4 className="text-sm font-bold" style={{ color: '#010D2D' }}>New example</h4>

      <div>
        <label style={labelStyle}>Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="e.g. SparkLayer Risk Register for TAG"
          style={inputStyle}
          required
          autoFocus
        />
      </div>

      <div>
        <label style={labelStyle}>Notes</label>
        <textarea
          value={form.notes}
          onChange={e => set('notes', e.target.value)}
          placeholder="What did you do? What was the outcome?"
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />
      </div>

      <div>
        <label style={labelStyle}>Link (Confluence, Figma, Miro, Jira etc)</label>
        <input
          type="url"
          value={form.url}
          onChange={e => set('url', e.target.value)}
          placeholder="https://..."
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Project</label>
        <select
          value={form.project}
          onChange={e => set('project', e.target.value)}
          style={inputStyle}
        >
          <option value="">Select project...</option>
          {PROJECTS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 text-sm font-bold py-2 rounded-lg transition-opacity cursor-pointer hover:opacity-90"
          style={{ backgroundColor: '#010D2D', color: '#FAF8F6' }}
        >
          Add example
        </button>
        <button
          type="button"
          onClick={() => { setForm(EMPTY); setOpen(false) }}
          className="px-4 text-sm font-medium rounded-lg transition-opacity cursor-pointer hover:opacity-70"
          style={{ border: '1px solid rgba(1,13,45,0.2)', color: '#010D2D', backgroundColor: 'transparent' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
