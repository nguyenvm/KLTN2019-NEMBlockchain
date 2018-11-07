import React, { Component, Fragment } from 'react';
import Header from './components/Header/index';
import UserContainer from './containers/UserContainer';

class App extends Component<any, any> {
    render() {
        return (
            <Fragment>
                <Header />
                <UserContainer />
            </Fragment>
        );
    }
}

export default App;
