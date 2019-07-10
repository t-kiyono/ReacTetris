import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import Actions from '../store/actions';
import { AppState } from '../store/state';

const Layout: React.FC<any> = props => {
  const dispatch = useDispatch();
  const modal = useSelector((state: AppState) => state.main.modal)
  const {
    okButtonText = 'OK',
    cancelButtonText = 'Cancel',
    cancelable
  } = modal;
  const onOk = () => dispatch(Actions.uiModalOk());
  const onCancel = cancelable ? () => dispatch(Actions.uiModalCancel()) : null;

  return (
    <div>
      {modal.show && (
        <Modal
          {...{ okButtonText, cancelButtonText, onOk, onCancel }}
          title={modal.title}>
          {modal.content}
        </Modal>
      )}
      {props.children}
    </div>
  )
}

export default Layout;
