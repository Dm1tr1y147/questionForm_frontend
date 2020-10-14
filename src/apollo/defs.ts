import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      success
    }
  }
`

const FORM = gql`
  query Form($id: Int!) {
    form(id: $id) {
      author {
        email
        id
        name
      }
      dateCreated
      id
      questions {
        number
        ... on ChoisesQuestion {
          title
          type
          variants {
            text
          }
        }
        ... on InputQuestion {
          number
          title
        }
      }
      title
    }
  }
`

const USER = gql`
  query User {
    user {
      email
      id
      name
    }
  }
`

const FORMSUBMIT = gql`
  mutation FormSubmit($formId: Int!, $answers: String!) {
    formSubmit(formId: $formId, answers: $answers) {
      success
    }
  }
`

export { LOGIN, FORM, USER, FORMSUBMIT }
