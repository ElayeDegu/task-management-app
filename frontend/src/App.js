import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignupPage from './pages/Authentication/SignupPage';
import LoginPage from './pages/Authentication/LoginPage';
import TaskListPage from './pages/TaskManagement/TaskListPage';
import TaskFormPage from './pages/TaskManagement/TaskFormPage';

const App = () => {
  // Your authentication logic here to determine if the user is authenticated
  const isAuthenticated = true; // For demonstration, assume the user is always authenticated

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/tasks" component={TaskListPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute path="/create-task" component={TaskFormPage} isAuthenticated={isAuthenticated} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App;
