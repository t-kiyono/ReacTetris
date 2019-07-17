import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import { AppState } from '../store';
import Actions from '../actions';
import Modal from './components/Modal';
import Help from './components/Help';

const Container = styled('div')({
  textAlign: 'center',
});

const Header = styled('header')({
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'space-around',
});

const Main = styled('div')({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Layout: React.FC = props => {
  const dispatch = useDispatch();
  const [modal, score, highScore] = useSelector((state: AppState) => [state.main.modal, state.main.score, state.main.highScore]);
  const {
    title = 'notification',
    okButtonText = 'OK',
    cancelButtonText = 'Cancel',
    cancelable,
  } = modal;
  const onOk = () => dispatch(Actions.uiModalOk());
  const onCancel = cancelable ? () => dispatch(Actions.uiModalCancel()) : undefined;

  return (
    <Container>
      {modal.show && (
        <Modal
          {...{ okButtonText, cancelButtonText, onOk, onCancel }}
          title={title}>
          {modal.content}
        </Modal>
      )}
      <Header>
        <div>
          Score: {score}
        </div>
        <div>
          HighScore: {highScore}
        </div>
      </Header>
      <Main>
        {props.children}
      </Main>
      <Help />
    </Container>
  )
}

export default Layout;
