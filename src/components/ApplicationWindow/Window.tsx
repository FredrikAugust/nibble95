import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ApplicationWindowContext, setActiveWindow } from '../../state/applicationWindowState';
import WindowBar from './WindowBar';

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
  transition: all 2s;
  height: 100%;
`;

type WindowProps = {
  className?: string;
  name: string;
  onClose?: () => void;
}

const Window: FC<WindowProps> = ({
    className, name, onClose, children,
}) => {
    const { AWDispatch } = useContext(ApplicationWindowContext);
    const onClick = () => AWDispatch(setActiveWindow(name));
    return (
        <Container className={className} onClick={onClick}>
            <WindowBar name={name} onClose={onClose} />
            {children}
        </Container>
    );
};

export default Window;
