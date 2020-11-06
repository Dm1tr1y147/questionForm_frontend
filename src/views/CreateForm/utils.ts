import { FormatQuestionsToSubmitFT } from './types'

export const creationsArray = [
  { title: 'Check', type: 'CHECK', enabled: false },
  { title: 'Input', type: 'INPUT', enabled: true },
  { title: 'Choose', type: 'CHOOSE', enabled: true },
  { title: 'Select', type: 'SELECT', enabled: true },
] as const

export const formatQuestionsToSubmit: FormatQuestionsToSubmitFT = (questions) =>
  JSON.stringify(
    questions.map((question) =>
      question.type === 'INPUT'
        ? { title: question.title }
        : {
            ...question,
            variants: question.variants.map((variant) => ({
              text: variant,
            })),
          }
    )
  )
