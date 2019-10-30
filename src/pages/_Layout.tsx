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

const HelpContainer = styled('div')({
  position: 'absolute',
  left: 0,
  '@media(max-width: 800px)': {
    display: 'none',
  }
});

const HelpLink = styled('span')({
  cursor: 'pointer',
  color: 'blue',
  '@media(min-width: 800px)': {
    display: 'none',
  }
});

const Layout: React.FC = props => {
  const dispatch = useDispatch();
  const [modal, score, highScore, level] = useSelector((state: AppState) => [state.main.modal, state.main.score, state.main.highScore, state.main.level]);
  const {
    title = 'notification',
    okButtonText = 'OK',
    cancelButtonText = 'Cancel',
    cancelable,
  } = modal;
  const onOk = () => dispatch(Actions.uiModalOk());
  const onCancel = cancelable ? () => dispatch(Actions.uiModalCancel()) : undefined;

  const handleClickHelpLink = () => dispatch(Actions.uiModalOpen({
    show: true,
    title: 'Help',
    content: Help(props),
  }));

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
        <div style={{textAlign: 'left'}}>
          <div>Score: {score}</div>
          <div>Level: {level}</div>
        </div>
        <div>
          <HelpLink onClick={handleClickHelpLink}>Help</HelpLink>
        </div>
        <div>
          HighScore: {highScore}
        </div>
      </Header>
      <Main>
        {props.children}
        <HelpContainer>
          <h4>Help</h4>
          <Help />
        </HelpContainer>
      </Main>
    </Container>
  )
}

export default Layout;
