import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import client from '../apollo'
import Context from '../context'
import { useUser } from '../hooks'
import Authorize from './Authorize'
import CreateForm from './CreateForm'
import DoForm from './DoForm'
import Login from './Login'
import Register from './Register'
import UserPage from './UserPage'

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
              <Route path="/form/:id" component={DoForm} />
              <Route path="/create" component={CreateForm} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Context.Provider>
      </ApolloProvider>
    </div>
  )
}

export default App
