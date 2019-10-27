import React from 'react';
import { Router } from '@reach/router';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Login path="/login" />
    </Router>
  );
}

export default App;
