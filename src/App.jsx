import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from 'containers/Layout/Layout'
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder'
import Logout from 'containers/Auth/Logout/Logout'

const Checkout = lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  const { onAuthCheckState } = props;
  useEffect(() => {
    onAuthCheckState();
  }, [onAuthCheckState]);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
