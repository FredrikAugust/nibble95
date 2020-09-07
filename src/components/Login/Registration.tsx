import React, { FC, useState } from 'react';
import { User } from '../../types/User';
import { registerUser, handleLogin } from '../../artillery/authorization';

type Props = {
  dispatchUser: (user?: User | null) => void;
  rfid: string;
}

const RegistrationView: FC<Props> = ({ dispatchUser, rfid }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [badLogin, setBadLogin] = useState(false);

    const bindRfid = () => registerUser(username, password, rfid)
        .then((response) => {
            if (response.ok) {
                handleLogin(rfid, dispatchUser);
            } else {
                setBadLogin(true);
            }
        });

    const register = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        if (event.keyCode === 13) {
            bindRfid();
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
                {badLogin ? <p>You logged in with wrong credentials. Try again</p> : null}
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    type="text"
                    onKeyUp={register}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    onKeyUp={register}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <button type="button" onClick={bindRfid}>OK</button>
                <button type="button" onClick={() => dispatchUser(undefined)}>Back</button>
            </div>
        </>
    );
};

export default RegistrationView;
