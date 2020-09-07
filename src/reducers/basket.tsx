import { StoreObject } from '../types/StoreObject';

export enum BasketTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

export interface State {
  [pk: number]: number
}

export interface Action {
  type: BasketTypes;
  item: StoreObject;
}

const reducer = (state: State, action: Action) => {
    const id = action.item.pk;
    switch (action.type) {
        case BasketTypes.ADD:
            return {
                ...state,
                [id]: state[id] ? state[id] + 1 : 1,
            };
        case BasketTypes.REMOVE:
            return { ...state, [id]: state[id] - 1 };
        default:
            return { ...state };
    }
};

const add = (item: StoreObject) => ({
    type: BasketTypes.ADD,
    item,
});

const remove = (item: StoreObject) => ({
    type: BasketTypes.REMOVE,
    item,
});

export { reducer, add, remove };
