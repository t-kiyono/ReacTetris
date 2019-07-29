import React from 'react';
import styled from '@emotion/styled';

const Key = styled('kbd')({
  height: '41px',
	minWidth: '20px',
	padding: '0 10px',
	margin: '5px 10px',
	background: '#EDEDED',
	borderRadius: '10px',
	boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.5)',
	color: '#808080',
	font: 'bold 18px arial',
	textAlign: 'center',
	lineHeight: '41px',
	display: 'inline-block',
});

const Dl = styled('dl')({
  position: 'absolute',
  left: 0,
  '@media(max-width: 800px)': {
    display: 'none',
  }
});

const Dt = styled('dt')({
  marginTop: '8px',
})

const Dd = styled('dd')({
  textAlign: 'left',
});

const Operation: React.FC = () => {
  return (
    <Dl>
      <Dt>Help</Dt>
      <Dd>
        <ul>
          <li><Key>↑</Key> rotate</li>
          <li><Key>←</Key> move to left</li>
          <li><Key>→</Key> move to right</li>
          <li><Key>↓</Key> drop</li>
          <li><Key>p</Key> pause</li>
          <li><Key>q</Key> quit</li>
        </ul>
      </Dd>
    </Dl>
  );
};

export default Operation;
