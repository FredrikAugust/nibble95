/* eslint-disable react/no-unused-prop-types */
// It is used in styled container
import React, {
    useContext,
    FC,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import styled from 'styled-components';
import Basket from './Basket';
import ShopWindow from './ShopWindow';
import Window from './Window';
import Button from './atom/Button';
import { ApplicationWindowTypes } from '../state/applicationWindowState';
import { GlobalContext, exitUser } from '../state/globalState';
import { User } from '../types/User';
import { getCategories } from '../types/StoreObject';

interface StoreProps {
  className?: string;
  windowActivity: ApplicationWindowTypes;
  name: string;
  onClick: Function;
  user: User
}

type CategoryBarProps = {
  categories: string[]
  setCategory: Dispatch<SetStateAction<string>>
}

const CategoryBar: FC<CategoryBarProps> = ({ categories, setCategory }: CategoryBarProps) => {
    const row = categories.map((category) => (
        <Button key={category} text={category} onClick={() => setCategory(category)} />
    ));
    return (
        <div className="category-window">
            {row}
        </div>
    );
};

const Store: FC<StoreProps> = (props: StoreProps) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [filterCategory, setFilterCategory] = useState('Alt');
    const {
        className,
        name,
        onClick,
    } = props;

    const logout = () => exitUser(dispatch);

    const username = state.user?.first_name || '';
    const titleText = state.isLoggingOut ? `Logging ${username} out of ` : 'Welcome to ';

    const welcomeTitle = (
        <>
            {titleText}
            {' '}
            <strong>Nibble</strong>
            <span>95</span>
            { state.user && !state.isLoggingOut ? `, ${username}` : ''}
        </>
    );

    const filteredInventory = state.inventory.filter((item) => {
        if (filterCategory === 'Alt') return item;
        return item.category.name === filterCategory;
    });

    const categories = getCategories(state.inventory);

    return (
        <Window className={className} name={name} onClick={onClick} onClose={logout}>
            <h1>
                <img
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt="Nibble Logo (Windows 95 Search Computer Icon)"
                />
                {welcomeTitle}
            </h1>
            <ShopWindow inventory={filteredInventory} />
            <Basket />
            <CategoryBar categories={categories} setCategory={setFilterCategory} />
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

  .category-window {
    grid-row: 4;
    display: flex;
    justify-content: flex-start;
  }

  grid-template-rows: 1.6em 3.2em auto min-content;
  grid-row: 1 /span 2;

  ${(props) => `${props.windowActivity === ApplicationWindowTypes.FOCUSED ? 'z-index: 1;' : 'z-index: 0;'}`}
  ${(props) => `${props.windowActivity === ApplicationWindowTypes.MINIMIZED ? 'display: none;' : ''}`}
  ${(props) => `${props.user ? 'grid-column: 1 /span 2;' : 'grid-column: 2;'}`}
`;
