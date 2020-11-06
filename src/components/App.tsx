import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import client from '../apollo'
import Authorize from '../views/Authorize'
import CreateForm from '../views/CreateForm'
import DoForm from '../views/DoForm'
import Home from '../views/Home'
import Login from '../views/Login'
import Navbar from './Navbar'
import Register from '../views/Register'

const App: React.FC = () => (
  <div className="App">
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/authorize" component={Authorize} />
          <Route path="/form/:id" component={DoForm} />
          <Route path="/create" component={CreateForm} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  </div>
)

export default App
