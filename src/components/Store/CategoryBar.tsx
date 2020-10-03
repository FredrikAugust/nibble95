import React, { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import Button from '../../atom/Button';
import { ApplicationWindowTypes } from '../../state/applicationWindowState';
import { Themes } from '../../state/globalState';

import * as windows95Theme from './themes/windows95';
import * as defaultTheme from './themes/default';

interface CategoryBarProps {
  categories: string[]
  selected: string
  setCategory: Dispatch<SetStateAction<string>>
  theme: Themes
}

interface CategoryButtonProps {
    setCategory: Dispatch<SetStateAction<string>>
    category: string
    isSelected: boolean
}

const CategoryButton: FC<CategoryButtonProps> = ({ setCategory, category, isSelected }) => {
    const onClick = () => setCategory(category);
    const activity = isSelected ? ApplicationWindowTypes.FOCUSED : undefined;
    return (
        <Button
            key={category}
            text={category}
            activity={activity}
            onClick={onClick}
        />
    );
};

const CategoryBar: FC<CategoryBarProps> = ({
    categories, setCategory, selected, theme,
}) => (
    <Component theme={theme}>
        {categories.map((category) => (
            <CategoryButton
                key={category}
                category={category}
                setCategory={setCategory}
                isSelected={selected === category}
            />
        ))}
    </Component>
);

const Component = styled.div`
    ${(props) => {
        switch (props.theme) {
            case Themes.WINDOWS95: return windows95Theme.CategoryBar;
            case Themes.DEFAULT: return defaultTheme.CategoryBar;
            default: return null;
        }
    }}
`;

export default CategoryBar;
