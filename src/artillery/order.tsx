import { TRANSACTION_URI } from './API';
import { postWithToken } from './tokens';
import { CartItem } from '../types/StoreObject';

type OrderLineFormat = {
    user: number,
    orders: CartItem[],
}

const purchaseItems = (id: number, orders: { [id: number]: CartItem; }): Promise<Response> => {
    const data: OrderLineFormat = {
        user: id,
        orders: Object.values(orders),
    };
    return postWithToken(TRANSACTION_URI, data);
};

export default purchaseItems;
