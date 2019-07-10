import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App history={history} />
    </div>
  </Provider>,
  document.getElementById('root')
);
