export type Phase = 'discover' | 'plan' | 'deliver' | 'launch' | 'grow'

export type Status =
  | 'consistently'
  | 'partially'
  | 'occasionally'
  | 'growth-area'
  | 'not-yet'
  | 'not-applicable'

export type Example = {
  id: string
  title: string
  notes: string
  url?: string
  imageUrl?: string
  project: string
  addedAt: string
}

export type Skill = {
  id: string
  name: string
  summary: string
  phase: Phase
  intermediateStatus: Status
  advancedStatus: Status
  seniorIndicators?: string
  growthAreaNote?: string
  examples: Example[]
}

export const PROJECTS = [
  'TAG Body Art',
  'GSM Retail',
  'Mitsubishi',
  'SM Wholesale',
  'APS Industrial',
  'Laser Clinics',
  'PVH',
  'Fruitbox',
  'Other',
] as const

// Aligent brand colours
// Depth: #010D2D  |  Depth 80%: #343D57  |  Clarity: #FAF8F6
// Imagination: #DA61F1  |  Imag 40%: #F0C0F9  |  Imag 20%: #F8DFFC

export type PhaseMeta = {
  label: string
  icon: string
  bgStyle: React.CSSProperties
  textClass: string
  badgeBg: string    // Tailwind class for badge bg
  badgeText: string  // Tailwind class for badge text
}

const LIGHT_PHASE_STYLE = {
  bgStyle: { backgroundColor: 'rgba(1,13,45,0.05)', borderColor: 'rgba(1,13,45,0.1)' },
  textClass: 'text-[#010D2D]',
  badgeBg: 'bg-[#010D2D]/5',
  badgeText: 'text-[#010D2D]',
}

export const PHASE_META: Record<Phase, PhaseMeta> = {
  discover: { label: 'Discover', icon: '🔍', ...LIGHT_PHASE_STYLE },
  plan:     { label: 'Plan',     icon: '📋', ...LIGHT_PHASE_STYLE },
  deliver:  { label: 'Deliver',  icon: '🚀', ...LIGHT_PHASE_STYLE },
  launch:   { label: 'Launch',   icon: '🛍️', ...LIGHT_PHASE_STYLE },
  grow:     { label: 'Grow',     icon: '📈', ...LIGHT_PHASE_STYLE },
}

export const STATUS_META: Record<Status, { label: string; color: string; dot: string }> = {
  consistently: { label: 'Consistently', color: 'text-emerald-700 bg-emerald-100', dot: 'bg-emerald-500' },
  partially: { label: 'Partially', color: 'text-yellow-700 bg-yellow-100', dot: 'bg-yellow-500' },
  occasionally: { label: 'Occasionally', color: 'text-yellow-600 bg-yellow-50', dot: 'bg-yellow-400' },
  'growth-area': { label: 'Growth Area', color: 'text-orange-700 bg-orange-100', dot: 'bg-orange-500' },
  'not-yet': { label: 'Not Yet', color: 'text-slate-500 bg-slate-100', dot: 'bg-slate-400' },
  'not-applicable': { label: 'N/A', color: 'text-slate-400 bg-slate-50', dot: 'bg-slate-300' },
}
