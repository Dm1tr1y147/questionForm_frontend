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
      forms {
        id
        title
      }
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

const CREATEFORM = gql`
  mutation CreateForm($title: String!, $questions: String!) {
    createForm(title: $title, questions: $questions) {
      success
    }
  }
`

export { LOGIN, FORM, USER, FORMSUBMIT, CREATEFORM }
