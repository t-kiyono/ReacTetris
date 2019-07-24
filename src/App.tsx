import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router'
import { useDispatch } from 'react-redux';
import { History } from 'history';

import Actions from './actions';
import Top from './pages/Top';
import Game from './pages/Game';
import Layout from './pages/_Layout';

interface OwnProps {
  history: History;
}

const App: React.FC<OwnProps> = props => {
  const dispatch = useDispatch();
  const handleKeyDown = (event: KeyboardEvent) => {
    dispatch(Actions.uiKeyDown(event.keyCode));
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <ConnectedRouter history={props.history}>
      <Layout>
        <Route exact path="/" component={Top} />
        <Route exact path="/game" component={Game} />
      </Layout>
    </ConnectedRouter>
  );
}

export default App;
