import { useRef } from 'react'

type Props = {
  onExport: () => void
  onImport: (file: File) => void
}

export function ExportButton({ onExport, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onImport(file)
    e.target.value = ''
  }

  const btnStyle = {
    fontSize: '0.75rem',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(250,248,246,0.2)',
    color: 'rgba(250,248,246,0.7)',
    backgroundColor: 'transparent',
    fontFamily: 'Manrope, sans-serif',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s',
  } as React.CSSProperties

  return (
    <div className="flex gap-2">
      <button
        onClick={onExport}
        style={btnStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(218,97,241,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = '#DA61F1' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(250,248,246,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,246,0.7)' }}
      >
        Export
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        style={btnStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(218,97,241,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = '#DA61F1' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(250,248,246,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,246,0.7)' }}
      >
        Import
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
