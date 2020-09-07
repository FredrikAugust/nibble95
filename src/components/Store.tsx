import React, { useContext, FC, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Basket from './Basket';
import ShopWindow from './ShopWindow';
import Window from './Window';
import { GlobalContext, exitUser } from '../globalState';
import { ApplicationState } from '../reducers/application';
import Button from './atom/Button';

interface StoreProps {
  className?: string;
  // It is used in styled container
  // eslint-disable-next-line react/no-unused-prop-types
  state: ApplicationState;
  name: string;
  onClick: Function;
}

type CategoryWindowProps = {
  categories: string[]
  setCategory: Dispatch<SetStateAction<string>>
}

const CategoryWindow: FC<CategoryWindowProps> = (
    { categories, setCategory }: CategoryWindowProps,
) => {
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
    const { className, name, onClick } = props;

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

    const categories = state.inventory.reduce((acc, current) => {
        if (acc.includes(current.category.name)) {
            return [...acc];
        }
        return [...acc, current.category.name];
    }, ['Alt'] as string[]);

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
            <CategoryWindow categories={categories} setCategory={setFilterCategory} />
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

  height: calc(95vh - 44px);
  width: 97vw;

  /* top: 2.5vh;
  left: 1.5vw; */

  ${(props) => `${props.state === 'focused' ? 'z-index: 1;' : 'z-index: 0'}`}
  ${(props) => `${props.state === 'minimized' ? 'display: none' : ''}`}
`;
