import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { State } from '../store';
import { Store } from 'redux';

const KeyHandler: React.FC = (props: Store<State>) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.captureKeys.includes(event.keyCode)) {
      props.dispatch(Actions.uiKeyDown(event.keyCode));
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

export default connect()(KeyHandler);
