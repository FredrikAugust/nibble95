import React from 'react';

import styled from 'styled-components';

import Window from './Window';

interface LoginProps {
  className?: string;
  state: 'focused' | 'not_focused' | 'minimized';
  name: string;
  onClick: Function;
}

const Login: React.FC<LoginProps> = ({ className, name, onClick }) => (
  <Window className={className} name={name} onClick={onClick}>
    <h1>
      Login
    </h1>
  </Window>
);

export default styled(Login)`
  ${props => `${props.state === 'minimized' ? 'display: none;' : ''}`}
  ${props => `${props.state === 'focused' ? 'z-index: 1;' : 'z-index: 0'}`}

  position: absolute;
  height: 30vh;
  width: 40vw;

  top: calc(50% - 30vh/2);
  left: calc(50% - 40vw/2);
`;
