import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { ApplicationWindowContext } from '../../state/applicationWindowState';
import { GlobalContext, Themes } from '../../state/globalState';

import * as windows95Theme from './themes/windows95';
import * as defaultTheme from './themes/default';

const Desktop: FunctionComponent = () => {
    const { state } = useContext(GlobalContext);
    const { AWState } = useContext(ApplicationWindowContext);

    return (
        <Container theme={state.theme}>
            {Object.entries(AWState).map(([name, componentState]) => (
                <componentState.component
                    key={name}
                    name={name}
                    windowActivity={componentState.windowActivity}
                    user={state.user}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
    ${(props) => {
        switch (props.theme) {
            case Themes.WINDOWS95: return windows95Theme.Container;
            case Themes.DEFAULT: return defaultTheme.Container;
            default: return null;
        }
    }}
`;

export default Desktop;
