import React from 'react';
import UserContainer from 'src/containers/User/UserContainer';
import WaterContainer from 'src/containers/Water/Consumption/WaterContainer';
import WaterBuyingContainer from 'src/containers/Water/Buying/WaterBuyingContainer';
import WaterSellingContainer from 'src/containers/Water/Selling/WaterSellingContainer';
import UserCheckingDataContainer from 'src/containers/Checking/User/UserCheckingDataContainer';
import WaterConsumptionCheckingContainer from 'src/containers/Checking/Water/WaterConsumptionCheckingContainer';

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
    },
    {
        path: '/checking/user',
        exact: true,
        main: () => <UserCheckingDataContainer />
    },
    {
        path: '/checking/water',
        exact: true,
        main: () => <WaterConsumptionCheckingContainer />
    }
]

export default routes;