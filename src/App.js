import React from 'react';
import { Router } from '@reach/router';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateReport from './screens/CreateReport';
import ViewReports from './screens/ViewReports';
import storage from './shared/core/storage';

function App() {
  storage.init();
  
  return (
    <div>
      <Router>
        <Login path="login" />
        <Signup path="signup" />
        <CreateReport path="reports/create" />
        <ViewReports path="reports" />
      </Router>
    </div>
  );
}

export default App;
