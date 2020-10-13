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
      id
      title
    }
  }
`

export { LOGIN, FORM }
