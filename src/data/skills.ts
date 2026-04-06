import type { Skill } from '../types'

export const INITIAL_SKILLS: Skill[] = [
  // ── DISCOVER ──────────────────────────────────────────────────────────────
  {
    id: 'requirements-gathering',
    name: 'Requirements Gathering',
    summary: 'Writing complex user stories, participating in story refinement, producing MoSCoW\'d scope and BSA diagrams.',
    phase: 'discover',
    intermediateStatus: 'consistently',
    advancedStatus: 'growth-area',
    seniorStatus: 'not-yet',
    advancedGrowthNotes: [
      'Facilitating workshops end-to-end and leading discovery sessions independently still developing',
    ],
    seniorGrowthNotes: [
      'Leading discovery sessions while identifying requirement dependencies and priorities',
      'Probing deeper into client business processes and unknowns',
    ],
    examples: [],
  },
  {
    id: 'technical-analysis',
    name: 'Technical Analysis',
    summary: 'Reading technical docs, contributing to diagrams, facilitating technical discovery, creating solution design documents, translating complex processes.',
    phase: 'discover',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'consistently',
    examples: [],
  },
  {
    id: 'business-practices',
    name: 'Business Practices',
    summary: 'Flagging out-of-scope work, working within agreed frameworks, simplifying complex processes, flagging risks early.',
    phase: 'discover',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'consistently',
    examples: [],
  },

  // ── PLAN ──────────────────────────────────────────────────────────────────
  {
    id: 'estimation-facilitation',
    name: 'Estimation Facilitation',
    summary: 'Facilitating estimation sessions, ensuring devs have adequate info, challenging estimates, leading workshops, validating scope and timeframes.',
    phase: 'plan',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'consistently',
    examples: [],
  },
  {
    id: 'agile-frameworks',
    name: 'Agile Frameworks',
    summary: 'Promoting Agile practices, ensuring principles are upheld, facilitating backlog refinement, proposing adaptations, leading retros.',
    phase: 'plan',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'consistently',
    examples: [],
  },
  {
    id: 'methodology-collateral',
    name: 'Methodology & Collateral',
    summary: 'Using templates consistently, recommending improvements, creating new collateral where gaps exist, encouraging uptake.',
    phase: 'plan',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'consistently',
    examples: [],
  },

  // ── DELIVER ───────────────────────────────────────────────────────────────
  {
    id: 'independence-autonomy',
    name: 'Independence & Autonomy',
    summary: 'Managing workload across multiple projects with low supervision, self-prioritising and communicating priorities to stakeholders.',
    phase: 'deliver',
    intermediateStatus: 'consistently',
    advancedStatus: 'partially',
    seniorStatus: 'not-yet',
    advancedGrowthNotes: [
      'Partially demonstrated - delegation and managing others not yet applicable without direct reports',
    ],
    seniorGrowthNotes: [
      'Delegating work effectively based on task relevance, capacity, and priority',
      'Managing handover, ongoing support, review, feedback, and delivery',
    ],
    examples: [],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    summary: 'Taking initiative, unblocking team members, influencing through facilitation and stakeholder engagement.',
    phase: 'deliver',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'growth-area',
    seniorGrowthNotes: [
      'Leading other analysts and members of the project team',
      'Aligning project work with client and business goals',
      'Leading people through mentorship, delegation, and team strategy',
    ],
    examples: [],
  },
  {
    id: 'communication',
    name: 'Communication',
    summary: 'Clear written and verbal communication across technical and non-technical stakeholders, adapting language to audience.',
    phase: 'deliver',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'growth-area',
    seniorGrowthNotes: [
      'Communicating complex concepts clearly at scale',
      'Mentoring others in impactful communication practices',
      'Contributing to a Quality Plan',
    ],
    examples: [],
  },

  // ── LAUNCH ────────────────────────────────────────────────────────────────
  {
    id: 'presentation',
    name: 'Presentation',
    summary: 'Presenting in client and internal settings, adapting messaging to audience.',
    phase: 'launch',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'growth-area',
    seniorGrowthNotes: [
      'Presenting complex ideas and solutions to clients, stakeholders, or internal leadership',
      'Crafting presentations tailored to diverse stakeholder groups that influence decisions',
    ],
    examples: [],
  },
  {
    id: 'sales-assistance',
    name: 'Sales Assistance',
    summary: 'Understanding Aligent\'s value offering, assisting with RFPs, explaining value proposition, answering platform questions.',
    phase: 'launch',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'growth-area',
    seniorGrowthNotes: [
      'Leading Discovery Output documentation to support the RFP process',
      'Supporting complex RFPs with deep technical and commercial understanding',
    ],
    examples: [],
  },

  // ── GROW ──────────────────────────────────────────────────────────────────
  {
    id: 'certifications-learning',
    name: 'Certifications & Learning',
    summary: 'Building a consistent learning habit, choosing training intentionally, proactively targeting learning to expand capability breadth.',
    phase: 'grow',
    intermediateStatus: 'consistently',
    advancedStatus: 'consistently',
    seniorStatus: 'growth-area',
    seniorGrowthNotes: [
      'Using learning strategically to uplift delivery outcomes across guilds',
      'Identifying capability gaps in the team to help others close them through guidance and shared resources',
    ],
    examples: [],
  },
]
