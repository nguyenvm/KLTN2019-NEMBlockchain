import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/index';
import UserContainer from './containers/UserContainer';
import routes from './utils/routes';

class App extends Component<any, any> {
    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    {this.showContentRoutes(routes)}
                </Fragment>
            </Router>
        );
    }

    showContentRoutes = (routes: Array<any>) => {
        var elementRoute = null;
        if (routes.length > 0) {
            elementRoute = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.main}
                    />
                )
            });
        }

        return <Switch>{elementRoute}</Switch>
    }
}

export default App;
