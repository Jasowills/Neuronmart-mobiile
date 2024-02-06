import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RecentlyViewedProvider } from './components/RecentlyViewedContext';
import MainContainer from './navigation/MainContainer';
import { ToastProvider } from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <RecentlyViewedProvider>
        <MainContainer />
      </RecentlyViewedProvider>
    </Provider>
  );
};

export default App;
