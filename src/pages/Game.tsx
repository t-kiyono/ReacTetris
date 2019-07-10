import React from 'react';
import { useSelector } from 'react-redux';
import KeyHandler from '../components/KeyHandler';
import Layout from '../components/Layout';
import * as Keys from '../game/keys';
import PlayField from '../components/PlayField';
import { AppState } from '../store/state';

const Game: React.FC = () => {
  const [score, board] = useSelector((state: AppState) => [state.main.score, state.main.board]);
  return (
    <Layout>
      <div>
        <style>
          {`
            .container {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              align-items: flex-start;
            }
            .info {
              flex: 1;
              padding: 1em;
              background-color: #111133;
              display: flex;
              flex-flow: column nowrap;
              align-items: stretch;
            }
            .info-item {
              flex: 1;
              padding: 1em;
              display: flex;
              color: white;
            }
            .playfield {
              flex: 2;
              padding: 1em;
              background-color: #111133;
            }
          `}
        </style>
        <KeyHandler captureKeys={[...Keys.ALL]} />
        <div className="container">
          <div className="info">
            <div className="info-item">SCORE {score}</div>
          </div>
          <div className="playfield">{board && <PlayField />}</div>
        </div>
      </div>
    </Layout>
  );
}

export default Game;
