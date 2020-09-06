import React from 'react';

import Desktop from './Desktop';
import StartBar from './StartBar';

import {
    add, minimize, reducer, set_active,
} from '../reducers/application';
import { StoreObject } from '../types/StoreObject';
import { GlobalProvider } from '../globalState';

const Container: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, {});

    return (
        <div style={{ height: 'calc(100vh - 44px)' }}>
            <Desktop
                applicationDispatch={dispatch}
                add={add}
                state={state}
            />
            <StartBar
                applicationDispatch={dispatch}
                state={state}
                minimize={minimize}
                set_active={set_active}
            />
        </div>
    );
};

export const StoreCtx = React.createContext<Array<StoreObject>>([]);

class App extends React.Component<{}, { items: Array<StoreObject> }> {
    constructor(props: {}) {
        super(props);

        this.state = { items: [] };
    }

    public async componentDidMount() {
        const res = await (
            await fetch(`${process.env.REACT_APP_API_BASE}/inventory/`)
        ).json();
        this.setState({ items: res });
    }

    public render() {
        return (
            <GlobalProvider>
              <StoreCtx.Provider value={this.state.items}>
                  <Container />
              </StoreCtx.Provider>
            </GlobalProvider>
        );
    }
}

export default App;
