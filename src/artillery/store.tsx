import { TRANSACTION_URI } from './API';
import { postWithToken } from './tokens';

const purchaseItems = (id: number, orders: number[]) => {
    console.log(orders);
    const data = {
        user: id,
        orders,
    };
    return postWithToken(TRANSACTION_URI, data);
};

export default purchaseItems;
