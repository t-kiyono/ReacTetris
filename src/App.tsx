import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router'

import Top from './pages/Top';
import Game from './pages/Game';

interface Props {
  history: any;
}

const App: React.FC<Props> = props => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Route exact path="/" component={Top} />
        <Route exact path="/game" component={Game} />
      </div>
    </ConnectedRouter>
  );
}

export default App;
