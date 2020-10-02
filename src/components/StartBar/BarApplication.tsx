import React, { FC } from 'react';
import Button from '../../atom/Button';
import {
    ApplicationWindowTypes,
} from '../../state/applicationWindowState';

type BarApplicationsProps = {
    name: string
    activity: ApplicationWindowTypes
    setWindowActivity: (activity: ApplicationWindowTypes, name: string) => void
};

const BarApplication: FC<BarApplicationsProps> = ({ setWindowActivity, activity, name }) => {
    const onClick = () => setWindowActivity(activity, name);
    return (
        <Button
            key={name}
            text={name}
            activity={activity}
            onClick={onClick}
            isApplication
        />
    );
};

export default BarApplication;
