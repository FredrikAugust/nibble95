import React, { useContext, useEffect, FC } from 'react';
import styled from 'styled-components';
import Desktop from './Desktop';
import StartBar from './StartBar';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext, setInventory, exitUser } from '../state/globalState';
import useFetch from '../hooks/useFetch';
import { INVENTORY_URI } from '../artillery/API';
import { ApplicationWindowProvider } from '../state/applicationWindowState';

export const LOGOUT_TIME = 1000 * 60 * 2;

const App: FC = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { data = [] }: { data: StoreObject[] } = useFetch(INVENTORY_URI);
    const { user } = state;

    useEffect(() => { // Set inventory when fetched
        if (data.length) {
            dispatch(setInventory(data));
        }
    }, [data, dispatch]);

    useEffect(() => { // Log out user after X time
        let timeoutId: number;
        if (user) {
            timeoutId = setTimeout(() => {
                exitUser(dispatch);
            }, LOGOUT_TIME);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [user, dispatch]);

    return (
        <Component>
            <ApplicationWindowProvider>
                <Desktop />
                <StartBar />
            </ApplicationWindowProvider>
        </Component>
    );
};

const Component = styled.div`
    height: calc(100vh - 44px);
`;

export default App;
