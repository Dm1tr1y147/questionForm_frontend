import React from 'react'

import {
  FormSubmission,
  InputAnswer,
  ChoiseAnswer,
  ChoisesQuestion,
  Question,
} from '../../apollo/typeDefs.gen'
import emptyIcon from './empty.svg'
import styles from './main.module.css'
import { getDateCreated } from '../../utils'

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
        <li className={styles.listItem} key={submissionIndex}>
          <h2 className={styles.itemHeader}>
            {`User ${
              submission.user ? submission.user.name : 'No submitter'
            } submitted on ${getDateCreated(submission.date)}:`}
          </h2>
          <ul>
            {submission.answers.map(
              (answer: InputAnswer | ChoiseAnswer, answerIndex) => (
                <li key={answerIndex}>
                  <div className={styles.question}>
                    <h3>{questions[answerIndex].title}</h3>
                    {answer.__typename === 'ChoiseAnswer' && (
                      <p>
                        {
                          (questions[answerIndex] as ChoisesQuestion).variants[
                            answer.userChoise
                          ].text
                        }
                      </p>
                    )}
                    {answer.__typename === 'InputAnswer' && (
                      <p>{answer.userInput}</p>
                    )}
                  </div>
                </li>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIconContainer}>
        <img className={styles.emptyIcon} src={emptyIcon} alt="Empty" />
      </div>
      <h3>No submissions yet :(</h3>
    </div>
  )
}

export default SubmissionList
