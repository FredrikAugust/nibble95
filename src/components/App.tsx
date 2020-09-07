import React, { useContext, useEffect, useReducer } from 'react';
import Desktop from './Desktop';
import StartBar from './StartBar';
import {
    add, minimize, reducer, set_active,
} from '../reducers/application';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext, setInventory, exitUser } from '../globalState';
import useFetch from '../hooks/useFetch';
import { INVENTORY_URI } from '../artillery/API';

const App: React.FC = () => {
    const [applicationState, applicationDispatch] = useReducer(reducer, {});
    const { state, dispatch } = useContext(GlobalContext);
    const { data = [] }: { data: StoreObject[] } = useFetch(INVENTORY_URI);
    const { user } = state;

    useEffect(() => {
        dispatch(setInventory(data));
    }, [data, dispatch]);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                exitUser(dispatch);
            }, 1000 * 60 * 2);
        }
    }, [user]);

    return (
        <div style={{ height: 'calc(100vh - 44px)' }}>
            <Desktop
                applicationDispatch={applicationDispatch}
                addApplication={add}
                applicationState={applicationState}
            />
            <StartBar
                applicationDispatch={applicationDispatch}
                applicationState={applicationState}
                minimizeApp={minimize}
                setActiveApp={set_active}
            />
        </div>
    );
};

export default App;
