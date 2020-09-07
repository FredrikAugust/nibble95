import React, { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  dispatchUser: (user?: User | null) => void;
}

const RegistrationView: FC<Props> = ({ dispatchUser }: Props) => {
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

export default RegistrationView;
