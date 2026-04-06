'use client'
import { useState } from 'react'
import type { Phase, Skill } from './types'
import { useSkillsData } from './hooks/useSkillsData'
import { JourneyMap } from './components/JourneyMap'
import { PhaseSection } from './components/PhaseSection'
import { ExampleDrawer } from './components/ExampleDrawer'

const PHASES: Phase[] = ['discover', 'plan', 'deliver', 'launch', 'grow']

export default function App() {
  const { skills, saveStatus, addExample, updateExample, removeExample, reorderExamples } = useSkillsData()
  const [activePhase, setActivePhase] = useState<Phase | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  function handleSelectPhase(phase: Phase) {
    setActivePhase(phase)
    setTimeout(() => setActivePhase(null), 1000)
  }

  const liveSelectedSkill = selectedSkill
    ? skills.find(s => s.id === selectedSkill.id) ?? null
    : null

  const totalExamples = skills.reduce((acc, s) => acc + s.examples.length, 0)
  const skillsWithEvidence = skills.filter(s => s.examples.length > 0).length

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Header */}
      <header style={{ backgroundColor: '#010D2D' }} className="px-5 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            {/* aligent wordmark placeholder */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#DA61F1' }}>
                aligent
              </span>
              <span style={{ color: 'rgba(250,248,246,0.2)' }}>|</span>
              <span className="text-xs font-medium" style={{ color: 'rgba(250,248,246,0.5)' }}>
                Skills Board
              </span>
            </div>
            <h1
              className="font-display text-xl"
              style={{ color: '#FAF8F6', fontWeight: 300 }}
            >
              Megan Hamer
              <span className="ml-2 text-sm font-sans font-medium" style={{ color: 'rgba(250,248,246,0.5)' }}>
                Analyst · April 2026
              </span>
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(250,248,246,0.4)', fontFamily: 'Manrope, sans-serif' }}>
              {skillsWithEvidence} of {skills.length} skills have evidence · {totalExamples} examples total
            </p>
          </div>
          <div className="text-xs font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {saveStatus === 'saving' && (
              <span style={{ color: 'rgba(250,248,246,0.4)' }}>Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span style={{ color: '#DA61F1' }}>Saved ✓</span>
            )}
            {saveStatus === 'error' && (
              <span style={{ color: '#f87171' }}>Save failed — check connection</span>
            )}
          </div>
        </div>
      </header>

      {/* Journey map nav */}
      <JourneyMap
        skills={skills}
        activePhase={activePhase}
        onSelectPhase={handleSelectPhase}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {PHASES.map(phase => {
          const phaseSkills = skills.filter(s => s.phase === phase)
          return (
            <PhaseSection
              key={phase}
              phase={phase}
              skills={phaseSkills}
              isActive={activePhase === phase}
              onSelectSkill={setSelectedSkill}
            />
          )
        })}
      </main>

      {/* Example drawer */}
      <ExampleDrawer
        skill={liveSelectedSkill}
        onClose={() => setSelectedSkill(null)}
        onAddExample={addExample}
        onUpdateExample={updateExample}
        onRemoveExample={removeExample}
        onReorderExamples={reorderExamples}
      />
    </div>
  )
}
