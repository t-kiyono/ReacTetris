import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import KeyHandler from '../components/KeyHandler';
import * as Keys from '../game/keys';
import { AppState } from '../store/state';

const Top: React.FC = () => {
  const highScore = useSelector((state: AppState) => state.main.highScore);
  return (
    <Layout>
      <style>
        {`
          .container {
            display: flex;
            flex-flow: column nowrap;
          }
          .content {
            flex-grow: 1;
            padding: 1em;
          }
          .h1 {
            size: 72pt;
          }
        `}
      </style>
      <div className="container">
        <KeyHandler captureKeys={Keys.ALL} />
        <div className="content">
          <h1>ReacTetris</h1>
        </div>
        <div className="content">HIGHSCORE {highScore}</div>
        <div className="content">(S) to start</div>
      </div>
    </Layout>
  );
}

export default Top;
