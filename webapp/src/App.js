import React from 'react'
import Voting from './pages/Voting/VotingContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home/HomeContainer'

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Voting} />
      <Route exact path="/results" component={Home} />
  </Router>
  )
}

export default App
