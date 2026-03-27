import { useMemo } from 'react'
import './index.css'
import { ThemeInputSection } from './components/ThemeInputSection'
import { ScriptEditorSection } from './components/ScriptEditorSection'
import { ValidationPanel } from './components/ValidationPanel'
import { PreviewSection } from './components/PreviewSection'
import { StatusBanner } from './components/StatusBanner'
import { useAppStore } from './state/app-store'
import { parseScenesFromYaml, validateTheme, validateYaml } from './domain/validation'
import { toUiError } from './services/error-envelope'
import { generateScript } from './services/script-generation-client'
import { buildPreviewText } from './services/preview-renderer'

function App() {
  const {
    phase,
    theme,
    yamlText,
    validation,
    scenes,
    selectedSceneIndex,
    errorMessage,
    setTheme,
    setYaml,
    setPhase,
    setValidation,
    setScenes,
    setSelectedSceneIndex,
    setErrorMessage,
  } = useAppStore()

  const canGenerate = validateTheme(theme).isValid && phase !== 'generating'

  async function onGenerate() {
    setPhase('generating')
    setErrorMessage(null)
    try {
      const result = await generateScript(theme)
      setYaml(result.yaml)
      setPhase('editing')
      onYamlChange(result.yaml)
    } catch (e) {
      const err = toUiError(e)
      setErrorMessage(err.message)
      setPhase('error')
    }
  }

  function onYamlChange(nextYaml: string) {
    setYaml(nextYaml)
    setPhase('validating')
    const report = validateYaml(nextYaml)
    setValidation(report)
    if (!report.isValid) {
      setPhase('editing')
      setScenes([])
      setSelectedSceneIndex(0)
      return
    }
    const nextScenes = parseScenesFromYaml(nextYaml)
    setScenes(nextScenes)
    setSelectedSceneIndex(0)
    setPhase('previewReady')
  }

  const previewText = useMemo(() => {
    const scene = scenes[selectedSceneIndex]
    if (!scene) return ''
    return buildPreviewText(scene)
  }, [scenes, selectedSceneIndex])

  return (
    <main className="container">
      <h1>ChalkTalk U1 Frontend</h1>
      <ThemeInputSection
        theme={theme}
        canGenerate={canGenerate}
        onThemeChange={setTheme}
        onGenerate={onGenerate}
      />
      <ScriptEditorSection yaml={yamlText} onYamlChange={onYamlChange} />
      <ValidationPanel report={validation} />
      <PreviewSection
        sceneCount={scenes.length}
        selectedIndex={selectedSceneIndex}
        previewText={previewText}
        onSelectScene={setSelectedSceneIndex}
      />
      <StatusBanner phase={phase} errorMessage={errorMessage} />
    </main>
  )
}

export default App
