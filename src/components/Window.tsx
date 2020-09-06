import React, { FC } from 'react';
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

type WindowProps = {
  className?: string;
  name: string;
  onClick: Function;
  onClose?: () => void;
  // eslint-disable-next-line no-undef
  children: JSX.Element[] | JSX.Element;
}

const Window: FC<WindowProps> = ({
    className,
    name,
    onClick,
    onClose,
    children,
}: WindowProps) => (
    <Draggable handle=".titlebar" onMouseDown={() => onClick()}>
        <Container className={className}>
            <TitleBar name={name} onClose={onClose} />
            {children}
        </Container>
    </Draggable>
);

export default Window;
