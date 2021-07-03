import React from 'react';
import {StatusBar} from 'react-native';
import '../src/config/ReactotronConfig';
import Routes from '../src/routes';

const App = () => (
  <>
    <StatusBar
      backgroundColor="transparent"
      translucent
      barStyle="light-content"
    />
    <Routes />
  </>
);

export default App;
