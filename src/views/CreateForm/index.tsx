import React from 'react'

import { QuestionTypes } from './types'
import { useFormCreator } from './hooks'
import { creationsArray, formatQuestionsToSubmit } from './utils'
import styles from './main.module.css'

const CreateForm: React.FC = () => {
  const [
    form,
    [formSubmit, { submitData, submitError, submitLoading }],
    {
      addQuestion,
      removeQuestion,
      handleFormTitleChange,
      handleQuestionTitleChange,
      handleAnswerVariantChange,
      addVariant,
    },
    resetForm,
  ] = useFormCreator<QuestionTypes>(formatQuestionsToSubmit)

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          formSubmit(e)
          resetForm()
        }}
      >
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Create form</h1>
          <input
            className={styles.textInput}
            type="text"
            name="Title"
            placeholder="title"
            value={form.title}
            onChange={handleFormTitleChange}
            required
          />
        </div>

        <div className={styles.mainFormContainer}>
          <fieldset className={styles.mainForm}>
            <div className={styles.mainFormTop} />
            <legend className={styles.fieldsetTitle}>Content</legend>
            <ul>
              {form.questions.map((quesstion, questionIndex) => (
                <li className={styles.questionToCreateLI} key={questionIndex}>
                  <div className={styles.questionHeader}>
                    <h3 className={styles.questionTitle}>
                      {quesstion.type} question:
                    </h3>
                    <input
                      className={[styles.textInput, styles.fullWidth].join(' ')}
                      required
                      type="text"
                      name="questionTitle"
                      placeholder="Title"
                      value={quesstion.title}
                      onChange={(e) =>
                        handleQuestionTitleChange(questionIndex, e)
                      }
                    />
                    <button
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault()
                        removeQuestion(questionIndex)
                      }}
                    >
                      x
                    </button>
                  </div>
                  {(quesstion.type === 'CHECK' ||
                    quesstion.type === 'CHOOSE' ||
                    quesstion.type === 'SELECT') && (
                    <>
                      <h4 className={styles.variantsHeader}>Variants</h4>
                      <ul>
                        {quesstion.variants.map((variant, variantIndex) => (
                          <li key={variantIndex}>
                            <input
                              className={[
                                styles.textInput,
                                styles.fullWidth,
                                styles.variantText,
                              ].join(' ')}
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
                        className={[styles.button, styles.addVariant].join(' ')}
                      >
                        +
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <ul>
              {creationsArray.flatMap((questionType, index) =>
                questionType.enabled
                  ? [
                      <li className={styles.questionCreatorLI} key={index}>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={() => addQuestion(questionType.type)}
                        >
                          + {questionType.title}
                        </button>
                      </li>,
                    ]
                  : []
              )}
            </ul>
          </fieldset>
        </div>
        <div className={styles.submitContainer}>
          {submitLoading ? (
            'Loading...'
          ) : (
            <input
              className={[styles.button, styles.submitButton].join(' ')}
              type="submit"
              value="Submit"
            />
          )}
        </div>
      </form>
      {submitData?.createForm.success && 'Successfully uploaded'}
      {submitError && submitError.message}
    </div>
  )
}

export default CreateForm
