import { StoreObject } from './../types/StoreObject';

const initialState = {};

export interface State {
  [pk: number]: number,
}

export interface Action {
  type: 'add' | 'remove';
  item: number;
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'add':
      return {...state, [action.item]: state[action.item] ? state[action.item] + 1 : 1};
    case 'remove':
      return {...state, [action.item]: state[action.item] - 1};
  }
}

const add = (item: StoreObject) => ({
  type: 'add',
  item: item.pk
});

const remove = (item: StoreObject) => ({
  type: 'remove',
  item: item.pk
});

export { reducer, initialState, add, remove };
