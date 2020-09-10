import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { User } from '../../types/User';
import Window from '../Window';
import { ApplicationWindowTypes } from '../../state/applicationWindowState';
import LoginView from './Login';
import { GlobalContext, setUser } from '../../state/globalState';
import RegistrationView from './Registration';

interface LoginProps {
  className?: string;
  name: string;
  onClick: Function;
  // It used with styled component
  // eslint-disable-next-line react/no-unused-prop-types
  windowActivity: ApplicationWindowTypes;
  user: User
}

const onEnterPressed = (func: Function) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
        func();
    }
};

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    const {
        className,
        name,
        onClick,
        user,
    } = props;
    const { dispatch } = useContext(GlobalContext);
    const [rfid, setRfid] = useState<string>('');

    const dispatchUser = (connectedUser?: User | null) => dispatch(setUser(connectedUser));
    if (user) return null;
    const view = user === undefined
        ? <LoginView dispatchUser={dispatchUser} setRfid={setRfid} onEnter={onEnterPressed} />
        : <RegistrationView dispatchUser={dispatchUser} rfid={rfid} onEnter={onEnterPressed} />;
    return (
        <Window className={className} name={name} onClick={onClick}>
            <Container>
                <div>
                    <img
                        src={`${process.env.PUBLIC_URL}/find.png`}
                        alt="Search icon win95"
                    />
                </div>
                {view}
            </Container>
        </Window>
    );
};

export const InputField = styled.div`
    display: flex;
    justify-content: space-between;

    input {
        grid-column: 2;

        border-top: 2px solid black;
        border-left: 2px solid black;
        border-right: 1px solid #c3c3c3;
        border-bottom: 1px solid #c3c3c3;

        box-shadow: 1px 1px 0 0.3px white;
        margin-right: 2px;
    }
`;


export default styled(Login)`
  ${(props) => `${props.windowActivity === ApplicationWindowTypes.MINIMIZED ? 'display: none;' : ''}`}
  ${(props) => `${
        props.windowActivity === ApplicationWindowTypes.FOCUSED ? 'z-index: 1;' : 'z-index: 0;'
    }`}

  grid-row: 1;
  grid-column: 1;
  height: fit-content;
  margin-right: 1em;
  grid-template-rows: 2em auto;

  top: calc(50% - 30vh / 2);
  left: calc(50% - 40vw / 2);
`;

const Container = styled.div`
    grid-column: 1 / span 12;
    display: grid;
    grid-template-rows: min-content min-content max-content;
    grid-gap: 10px;
    height: auto;
    font-size: 20px;

    div:nth-child(1) {
        grid-row: 1 / span 2;
        grid-column: 1;

        img {
            margin: auto;
            display: block;
            width: 2em;
        }
    }

    div:nth-child(2) {
        grid-row: 1;
        grid-column: 2;

        p {
            font-weight: 100;
            margin: 0;
        }
    }

    div:nth-child(3) {
        grid-row: 2 / span 1;
        grid-column: 1 /span 2;
    }

    div:nth-child(4) {
        grid-row: 3;
        grid-column: 1 /span 2;

        button {
            height: 1.8em;
            border-top: 1px solid white;
            border-left: 1px solid white;
            border-right: 1px solid #929292;
            border-bottom: 1px solid #929292;

            box-shadow: 1px 1px 0 1px black;

            width: calc(100% - 3px);

            font-weight: 100;
            font-family: monospace;
            font-size: 0.9em;

            background: #c3c3c3;
            margin-bottom: 0.5em;

            &::first-letter {
              text-decoration: underline;
            }
        }
    }

    div:nth-child(5) {
        margin: auto;
        grid-row: 4;
        grid-column: 1 /span 2;

        img {
            max-height: 250px;
        }
    }
`;
