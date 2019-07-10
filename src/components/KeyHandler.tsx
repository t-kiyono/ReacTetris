import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Actions from '../store/actions';

interface ownProps {
  captureKeys: Array<number>;
}

const KeyHandler: React.FC<ownProps> = props => {
  const dispatch = useDispatch();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.captureKeys.includes(event.keyCode)) {
      dispatch(Actions.uiKeyDown(event.keyCode));
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div />
  );
};

export default KeyHandler;
