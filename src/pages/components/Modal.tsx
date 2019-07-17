import React from 'react';
import { Action } from 'redux';
import styled from '@emotion/styled';

interface OwnProps {
  title: string;
  okButtonText: string;
  cancelButtonText: string;
  onOk: () => Action;
  onCancel?: () => Action;
}

const ModalContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'block',
  overflow: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 9999,
});

const ModalWindow = styled('div')({
  position: 'relative',
  backgroundColor: '#ffffff',
  width: '50%',
  margin: '10% auto',
  padding: '15px',
});

const Button = styled('button')({
  padding: '10px',
  fontSize: '14px',
  border: 'none',
  margin: '5px',
  marginTop: '10px',
  color: '#fff',
  background: '#66aaff',
});

const CancelButton = styled(Button)({
  background: 'indianred',
})

const Close = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  color: 'rgba(0, 0, 0, 0.3)',
  height: '30px',
  width: '30px',
  fontSize: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  ':hover,:focus': {
    color: '#000000',
    cursor: 'pointer',
  },
});

const Modal: React.FC<OwnProps> = props => (
  <ModalContainer>
    <ModalWindow>
      {props.onCancel && (
        <Close onClick={props.onCancel}>&times;</Close>
      )}
      <h3>{props.title}</h3>
      <hr />
      {props.children}
      <Button onClick={props.onOk}>{props.okButtonText}</Button>
      {props.onCancel && (
        <CancelButton onClick={props.onCancel}>{props.cancelButtonText}</CancelButton>
      )}
    </ModalWindow>
  </ModalContainer>
);

export default Modal;
