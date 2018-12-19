import React from 'react';
import UserContainer from '../containers/UserContainer';
import WaterContainer from 'src/containers/WaterContainer';

const routes = [ 
    {
        path: '/user',
        exact: true,
        main: () => <UserContainer />
    },
    {
        path: '/water',
        exact: true,
        main: () => <WaterContainer />
    }
]

export default routes;