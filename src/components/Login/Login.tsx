import React, { FC, useRef, useEffect } from 'react';
import { User } from '../../types/User';
import { handleLogin, login } from '../../artillery/authorization';

type Props = {
  dispatchUser: (user?: User | null) => void;
}

const LoginView: FC<Props> = ({ dispatchUser }: Props) => {
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

export default LoginView;
