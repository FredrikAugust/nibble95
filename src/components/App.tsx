import React, { useContext, useEffect, FC } from 'react';
import styled from 'styled-components';
import Desktop from './Desktop';
import StartBar from './StartBar';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext } from '../state/globalState';
import { INVENTORY_URI } from '../artillery/API';
import { ApplicationWindowProvider } from '../state/applicationWindowState';
import { setInventory, exitUser } from '../state/actions';

export const LOGOUT_TIME = 1000 * 60 * 2;

const fetchInventory = async (uri: string, options = {}): Promise<StoreObject[]> => {
    const response = await fetch(uri, options);
    if (response.ok) {
        const json = await response.json();
        return json;
    }
    return [];
};

const App: FC = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { user } = state;

    useEffect(() => { // Set inventory when fetched
        const getData = async () => {
            const data = await fetchInventory(INVENTORY_URI);
            if (!state.inventory.length) {
                dispatch(setInventory(data));
            }
            if (user && JSON.stringify(data) !== JSON.stringify(state.inventory)) {
                dispatch(setInventory(data));
            }
        };

        getData();
    }, [dispatch, user]);

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
