import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import client from '../apollo'
import Context from '../context'
import { useUser } from '../hooks'
import Authorize from './Authorize'
import Login from './Login'
import UserPage from './UserPage'

// const TestComponent: React.FC = () => {
//   const { loading, error, data } = useQuery(FORM, {
//     variables: {
//       id: 1
//     }
//   })

//   const { user } = useContext(Context)

//   const [doLogin] = useMutation(LOGIN)

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error :(</p>

//   return (
//     <div>
//       <button
//         onClick={() => doLogin({ variables: { email: 'test@test.test' } })}
//       >
//         Click!
//       </button>
//       {user.id}
//       {data.form.id}
//     </div>
//   )
// }

const App: React.FC = () => {
  const userContext = useUser()

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Context.Provider value={userContext}>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/authorize" component={Authorize} />
              <Route path="/user" component={UserPage} />
            </Switch>
          </Router>
        </Context.Provider>
      </ApolloProvider>
    </div>
  )
}

export default App
