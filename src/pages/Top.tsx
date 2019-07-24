import React from 'react';
import styled from '@emotion/styled';

const Title = styled('h1')({
  size: '72pt',
});

const Content = styled('div')({
  padding: '1em',
})

const Top: React.FC = () => {
  return (
    <div>
      <Content>
        <Title>ReacTetris</Title>
      </Content>
      <Content>press (s) key to start game</Content>
    </div>
  );
}

export default Top;
