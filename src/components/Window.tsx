import React from 'react';

import styled from 'styled-components';

import Draggable from 'react-draggable';
import TitleBar from './TitleBar';

const Container = styled.div`
  background: #c3c3c3;

  border-top: 4px solid #eee;
  border-left: 4px solid #eee;

  border-right: 2px solid #c3c3c3;
  border-bottom: 2px solid #c3c3c3;

  box-shadow: 1px 1px 0 1px black;

  display: grid;
  grid-template-columns: repeat(12, 8.25%);

  padding: 0.5em;

  position: absolute;

  height: 100%;
`;

const Window: React.FC<{
  className?: string;
  name: string;
  onClick: Function;
}> = (props) => (
    <Draggable handle=".titlebar" onMouseDown={() => props.onClick()}>
        <Container className={props.className}>
            <TitleBar name={props.name} />
            {props.children}
        </Container>
    </Draggable>
);

export default Window;
