import { create } from 'zustand'
import type { AppPhase, SceneViewModel, ValidationReport } from '../domain/types'

interface AppState {
  phase: AppPhase
  theme: string
  yamlText: string
  validation: ValidationReport
  scenes: SceneViewModel[]
  selectedSceneIndex: number
  errorMessage: string | null
  setTheme: (theme: string) => void
  setYaml: (yamlText: string) => void
  setPhase: (phase: AppPhase) => void
  setValidation: (validation: ValidationReport) => void
  setScenes: (scenes: SceneViewModel[]) => void
  setSelectedSceneIndex: (index: number) => void
  setErrorMessage: (message: string | null) => void
}

const emptyValidation: ValidationReport = { isValid: false, errors: [], warnings: [] }

export const useAppStore = create<AppState>((set) => ({
  phase: 'idle',
  theme: '',
  yamlText: '',
  validation: emptyValidation,
  scenes: [],
  selectedSceneIndex: 0,
  errorMessage: null,
  setTheme: (theme) => set({ theme }),
  setYaml: (yamlText) => set({ yamlText }),
  setPhase: (phase) => set({ phase }),
  setValidation: (validation) => set({ validation }),
  setScenes: (scenes) => set({ scenes }),
  setSelectedSceneIndex: (selectedSceneIndex) => set({ selectedSceneIndex }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
}))

