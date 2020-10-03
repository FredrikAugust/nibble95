/* eslint-disable react/no-unused-prop-types */
// It is used in styled container
import React, {
    useContext,
    FC,
    useState,
} from 'react';
import styled from 'styled-components';
import Basket from '../Basket';
import ShopWindow from './ShopWindow';
import Window from '../ApplicationWindow/Window';
import { ApplicationWindowTypes } from '../../state/applicationWindowState';
import { GlobalContext, Themes } from '../../state/globalState';
import { User } from '../../types/User';
import { getCategories } from '../../types/StoreObject';
import CategoryBar from './CategoryBar';
import WelcomeTitle from './WelcomeTitle';
import { exitUser } from '../../state/actions';

import * as windows95Theme from './themes/windows95';
import * as defaultTheme from './themes/default';

export type StoreProps = {
  className?: string
  windowActivity: ApplicationWindowTypes
  name: string
  user: User
  theme: Themes
}

const Store: FC<StoreProps> = (props: StoreProps) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [filterCategory, setFilterCategory] = useState('Alt');
    const { className, name } = props;

    const logout = () => exitUser(dispatch);

    const filteredInventory = state.inventory.filter((item) => {
        if (filterCategory === 'Alt') return item;
        return item.category.name === filterCategory;
    });

    const categories = getCategories(state.inventory);

    return (
        <Window className={className} name={name} onClose={logout}>
            <WelcomeTitle theme={state.theme} user={state.user} />
            <ShopWindow inventory={filteredInventory} />
            <Basket />
            <CategoryBar
                theme={state.theme}
                categories={categories}
                setCategory={setFilterCategory}
                selected={filterCategory}
            />
        </Window>
    );
};

export default styled(Store)`
    ${(props) => {
        switch (props.theme) {
            case Themes.WINDOWS95: return windows95Theme.Store;
            case Themes.DEFAULT: return defaultTheme.Store;
            default: return null;
        }
    }}
`;
