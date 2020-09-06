import React, { useContext, useEffect, FC } from 'react';
import Desktop from './Desktop';
import StartBar from './StartBar';
import {
    add, minimize, reducer, set_active,
} from '../reducers/application';
import { StoreObject } from '../types/StoreObject';
import { GlobalContext, GlobalActionTypes } from '../globalState';

const Container: React.FC = () => {
    const [applicationState, applicationDispatch] = React.useReducer(reducer, {});

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

const App: FC = () => {
    const { dispatch } = useContext(GlobalContext);

    useEffect(() => {
        const dispatchItems = (payload: StoreObject[]) => (
            dispatch({ type: GlobalActionTypes.SET_ITEMS, payload })
        );
        const fetchItems = () => fetch(`${process.env.REACT_APP_API_BASE}/inventory/`)
            .then((response) => response.json())
            .then((result) => dispatchItems(result));

        fetchItems();
    }, [dispatch]);
    return (
        <Container />
    );
};

export default App;
