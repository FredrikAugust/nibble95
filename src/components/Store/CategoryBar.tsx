import React, { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import Button from '../../atom/Button';
import { ApplicationWindowTypes } from '../../state/applicationWindowState';

interface CategoryBarProps {
  categories: string[]
  selected: string
  setCategory: Dispatch<SetStateAction<string>>
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

const CategoryBar: FC<CategoryBarProps> = ({ categories, setCategory, selected }) => (
    <Component>
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
    grid-row: 4;
    display: flex;
    margin-top: 10px;
    justify-content: flex-start;
`;

export default CategoryBar;
