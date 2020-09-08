import React, { useContext, useEffect } from 'react';
import Desktop from './Desktop';
import StartBar from './StartBar';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext, setInventory, exitUser } from '../state/globalState';
import useFetch from '../hooks/useFetch';
import { INVENTORY_URI } from '../artillery/API';
import { ApplicationWindowProvider } from '../state/applicationWindowState';

export const LOGOUT_TIME = 1000 * 60 * 2;

const App: React.FC = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { data = [] }: { data: StoreObject[] } = useFetch(INVENTORY_URI);
    const { user } = state;

    useEffect(() => {
        if (data.length) {
            dispatch(setInventory(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                exitUser(dispatch);
            }, LOGOUT_TIME);
        }
    }, [user, dispatch]);

    return (
        <div style={{ height: 'calc(100vh - 44px)' }}>
            <ApplicationWindowProvider>
                <Desktop />
                <StartBar />
            </ApplicationWindowProvider>
        </div>
    );
};

export default App;
