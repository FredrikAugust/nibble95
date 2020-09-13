import React, { FC } from 'react';
import { User } from '../../types/User';

type WelcomeTitleProps = {
  user: User | null | undefined
}

const WelcomeTitle: FC<WelcomeTitleProps> = ({ user }) => {
    const username = user?.first_name || '';
    return (
        <h1>
            <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Nibble Logo (Windows 95 Search Computer Icon)"
            />
            Weclome to &nbsp;
            <strong>Nibble</strong>
            <span>95</span>
            { user ? `, ${username}` : null}
        </h1>
    );
};

export default WelcomeTitle;
