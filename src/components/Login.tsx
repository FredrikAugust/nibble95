import React, {
    useContext, FC, useRef, useEffect,
} from 'react';
import styled from 'styled-components';
import { login, LoginResponse } from '../artillery/API';
import { User } from '../types/User';
import Window from './Window';
import { GlobalContext, GlobalActionTypes } from '../globalState';
import { ApplicationState } from '../reducers/application';

interface LoginProps {
  className?: string;
  name: string;
  onClick: Function;
  // It used with styled component
  // eslint-disable-next-line react/no-unused-prop-types
  state: ApplicationState;
}

async function handleLogin(
    lr: LoginResponse,
    dispatchUser: (user: User | null) => void,
): Promise<void> {
    if (lr.count) {
        const { pk, saldo } = lr.results[0];
        dispatchUser({ pk, balance: saldo });
    } else {
        dispatchUser(null);
    }
}

type LoginViewProps = {
  dispatchUser: (user?: User | null) => void;
}

const LoginView: FC<LoginViewProps> = ({ dispatchUser }: LoginViewProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    inputRef.current!.focus();
    });

    return (
        <>
            <div>
                <img
                    src={`${process.env.PUBLIC_URL}/find.png`}
                    alt="Search icon win95"
                />
            </div>
            <div>
                <p>Please scan your student card to log in or register to Nibble.</p>
            </div>
            <div>
                <label htmlFor="rfid">RFID: </label>
                <input
                    id="rfid"
                    type="text"
                    ref={inputRef}
                    onKeyUp={async (e) => {
                        e.persist();
                        if (e.keyCode === 13) {
                            handleLogin(await login(e.currentTarget.value), dispatchUser);
                            (e.target as EventTarget & HTMLInputElement).value = '';
                        }
                    }}
                />
            </div>
            <div>
                <button type="button">OK</button>
            </div>
        </>
    );
};

const RegistrationView: FC<LoginViewProps> = ({ dispatchUser }: LoginViewProps) => {
    const register = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        if (event.keyCode === 13) {
            console.log('TODO register');
        }
    };
    return (
        <>
            <div>
                <img
                    src={`${process.env.PUBLIC_URL}/find.png`}
                    alt="Search icon win95"
                />
            </div>
            <div>
                <p>Register with your Online.ntnu.no username and password.</p>
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    type="text"
                    onKeyUp={register}
                />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    onKeyUp={register}
                />
            </div>
            <div>
                <button type="button">OK</button>
                <button type="button" onClick={() => dispatchUser(undefined)}>Back</button>
            </div>
        </>
    );
};

const Login: React.FC<LoginProps> = ({ className, name, onClick }: LoginProps) => {
    const { state, dispatch } = useContext(GlobalContext);
    const { user } = state;

    const dispatchUser = (connectedUser?: User | null) => (
        dispatch({ type: GlobalActionTypes.SET_USER, payload: connectedUser })
    );
    if (user) return null;
    const view = user === undefined
        ? <LoginView dispatchUser={dispatchUser} />
        : <RegistrationView dispatchUser={dispatchUser} />;
    return (
        <Window className={className} name={name} onClick={onClick}>
            <Container>
                {view}
            </Container>
        </Window>
    );
};

export default styled(Login)`
  ${(props) => `${props.state === ApplicationState.MINIMIZED ? 'display: none;' : ''}`}
  ${(props) => `${
        props.state === ApplicationState.FOCUSED ? 'z-index: 1;' : 'z-index: 0'
    }`}

  position: absolute;
  width: 40vw;
  height: auto;
  grid-template-rows: 2em auto;

  top: calc(50% - 30vh / 2);
  left: calc(50% - 40vw / 2);
`;

const Container = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-rows: 3em 1.5em auto;
  grid-template-columns: 15% auto 20%;
  grid-gap: 10px;
  height: auto;

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
    grid-column: 2;
    display: grid;
    grid-template-columns: 4em auto;

    label {
      grid-column: 1;
    }

    input {
      grid-column: 2;
      width: 100%;

      border-top: 2px solid black;
      border-left: 2px solid black;
      border-right: 1px solid #c3c3c3;
      border-bottom: 1px solid #c3c3c3;

      box-shadow: 1px 1px 0 0.3px white;

      display: inline;

      height: 1.4em;
      padding: 0.1em;
    }
  }

  div:nth-child(4) {
    grid-row: 1;
    grid-column: 3;

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

      &::first-letter {
        text-decoration: underline;
      }
    }
  }
`;
