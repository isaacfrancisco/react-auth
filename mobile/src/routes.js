import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from '../src/pages/Main';

const Routes = createAppContainer(createSwitchNavigator({Main}));

export default Routes;
