import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './App';
import { Global } from '@emotion/core';
import globalStyle from './globalStyle';

ReactDOM.render(
  <>
    <Global styles={globalStyle} />
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </>,
  document.getElementById('root')
);
