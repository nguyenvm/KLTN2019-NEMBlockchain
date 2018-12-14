import React from 'react';
import UserContainer from '../containers/UserContainer';

const routes = [ 
    {
        path: '/user-list',
        exact: true,
        main: () => <UserContainer />
    }
]

export default routes;