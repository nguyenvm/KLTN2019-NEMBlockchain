import React from 'react';
import UserContainer from '../containers/UserContainer';
import WaterContainer from 'src/containers/WaterContainer';
import WaterBuyingContainer from 'src/containers/WaterBuyingContainer';
import WaterSellingContainer from 'src/containers/WaterSellingContainer';

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
    },
    {
        path: '/water/buying-activity',
        exact: true,
        main: () => <WaterBuyingContainer />
    },
    {
        path: '/water/selling-activity',
        exact: true,
        main: () => <WaterSellingContainer />
    }
]

export default routes;