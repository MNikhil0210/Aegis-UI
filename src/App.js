import React from 'react';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom'
import Skeleton from './pages/Skeleton';
import { Provider } from 'react-redux';
import store from './store';
import Loading from './pages/Loading';
function App() {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route exact path='/load' component={Loading} />
          <Route exact path='/dashboard' component={() => <Skeleton />} />
          <Route exact path='/' component={Login} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
