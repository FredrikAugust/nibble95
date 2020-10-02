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
import { GlobalContext } from '../../state/globalState';
import { User } from '../../types/User';
import { getCategories } from '../../types/StoreObject';
import CategoryBar from './CategoryBar';
import WelcomeTitle from './WelcomeTitle';
import { exitUser } from '../../state/actions';

type StoreProps = {
  className?: string
  windowActivity: ApplicationWindowTypes
  name: string
  user: User
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
            <WelcomeTitle user={state.user} />
            <ShopWindow inventory={filteredInventory} />
            <Basket />
            <CategoryBar
                categories={categories}
                setCategory={setFilterCategory}
                selected={filterCategory}
            />
        </Window>
    );
};

export default styled(Store)`
  h1 {
    padding: 0;
    margin: 0;

    font-size: 2.2em;

    font-weight: 600;
    font-family: serif;

    grid-column: 1 / span 13;
    grid-row: 2;

    strong {
      font-weight: 800;
    }

    span {
      color: white;
      font-weight: 100;
      font-size: 1.2em;
    }

    img {
      margin-right: 0.3em;
      vertical-align: middle;
      margin-top: -10px;
    }
  }

  grid-template-rows: 1.6em 3.2em auto min-content;
  grid-row: 1 /span 2;

  ${(props) => `${props.windowActivity === ApplicationWindowTypes.FOCUSED ? 'z-index: 1;' : 'z-index: 0;'}`}
  ${(props) => `${props.windowActivity === ApplicationWindowTypes.MINIMIZED ? 'display: none;' : ''}`}
  ${(props) => `${props.user ? 'grid-column: 1 /span 2;' : 'grid-column: 2;'}`}
`;
