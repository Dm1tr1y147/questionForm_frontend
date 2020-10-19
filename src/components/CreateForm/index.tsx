import React from 'react'

import { FormatQuestionsToSubmitType, useFormCreator } from './hooks'

const creationsArray = [
  { title: 'Check', type: 'CHECK', enabled: false },
  { title: 'Input', type: 'INPUT', enabled: true },
  { title: 'Choose', type: 'CHOOSE', enabled: true },
  { title: 'Select', type: 'SELECT', enabled: true },
] as const

type QuestionTypes = 'CHECK' | 'INPUT' | 'CHOOSE' | 'SELECT'

const formatQuestionsToSubmit: FormatQuestionsToSubmitType = (questions) => {
  return JSON.stringify(
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
}

const CreateForm: React.FC = () => {
  const [
    form,
    [formSubmit, { submitData, submitError, submitLoading }],
    {
      addQuestion,
      handleFormTitleChange,
      handleQuestionTitleChange,
      handleAnswerVariantChange,
      addVariant,
    },
    resetForm,
  ] = useFormCreator<QuestionTypes>(formatQuestionsToSubmit)

  return (
    <>
      <form
        onSubmit={(e) => {
          resetForm()
          formSubmit(e)
        }}
      >
        <label>
          Title:
          <input
            type="text"
            name="Title"
            value={form.title}
            onChange={handleFormTitleChange}
            required
          />
        </label>

        <fieldset>
          <legend>Content</legend>
          <ul>
            {creationsArray.flatMap((questionType, index) =>
              questionType.enabled
                ? [
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => addQuestion(questionType.type)}
                      >
                        {questionType.title}
                      </button>
                    </li>,
                  ]
                : []
            )}
          </ul>
          <ul>
            {form.questions.map((quesstion, questionIndex) => (
              <li key={questionIndex}>
                <p>{quesstion.type} question:</p>
                <input
                  required
                  type="text"
                  name="questionTitle"
                  placeholder="Title"
                  value={quesstion.title}
                  onChange={(e) => handleQuestionTitleChange(questionIndex, e)}
                />
                {(quesstion.type === 'CHECK' ||
                  quesstion.type === 'CHOOSE' ||
                  quesstion.type === 'SELECT') && (
                  <>
                    <ul>
                      {quesstion.variants.map((variant, variantIndex) => (
                        <li key={variantIndex}>
                          <input
                            required
                            placeholder="Variant"
                            type="text"
                            value={variant}
                            onChange={(e) =>
                              handleAnswerVariantChange(
                                questionIndex,
                                variantIndex,
                                e
                              )
                            }
                          />
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => addVariant(questionIndex)}
                    >
                      +
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </fieldset>
        {submitLoading ? 'Loading...' : <input type="submit" value="Submit" />}
      </form>
      {submitData &&
        submitData.createForm &&
        submitData.createForm.success &&
        'Successfully uploaded'}
      {submitError && submitError.message}
    </>
  )
}

export default CreateForm
