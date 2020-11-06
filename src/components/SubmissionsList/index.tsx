import React from 'react'

import {
  FormSubmission,
  InputAnswer,
  ChoiseAnswer,
  ChoisesQuestion,
  Question,
} from '../../apollo/typeDefs.gen'

interface ISubmissionListProps {
  submissions: FormSubmission[]
  questions: Question[]
}

const SubmissionList: React.FC<ISubmissionListProps> = ({
  submissions,
  questions,
}) => {
  return submissions.length > 0 ? (
    <ul>
      {submissions.map((submission, submissionIndex) => (
        <li key={submissionIndex}>
          <h2>
            User: {submission.user ? submission.user.name : 'No submitter'}
          </h2>
          <ul>
            {submission.answers.map(
              (answer: InputAnswer | ChoiseAnswer, answerIndex) => (
                <li key={answerIndex}>
                  <h3>{questions![answerIndex].title}</h3>
                  {answer.__typename === 'ChoiseAnswer' && (
                    <h4>
                      {
                        (questions![answerIndex] as ChoisesQuestion).variants[
                          answer.userChoise
                        ].text
                      }
                    </h4>
                  )}
                  {answer.__typename === 'InputAnswer' && (
                    <h4>{answer.userInput}</h4>
                  )}
                </li>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    <p>No submissions yet</p>
  )
}

export default SubmissionList
