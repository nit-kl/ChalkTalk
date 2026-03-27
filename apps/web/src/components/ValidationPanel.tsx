import type { ValidationReport } from '../domain/types'

type Props = { report: ValidationReport }

export function ValidationPanel({ report }: Props) {
  return (
    <section>
      <h2>検証結果</h2>
      <div data-testid="validation-panel-status">
        {report.isValid ? '検証OK' : '検証エラーあり'}
      </div>
      {!report.isValid && (
        <ul data-testid="validation-panel-errors">
          {report.errors.map((e, i) => (
            <li key={`${e.code}-${i}`}>{e.line ? `L${e.line}: ` : ''}{e.message}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

