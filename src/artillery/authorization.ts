import { LoginResponse, LOGIN_URI } from './API';
import { User } from '../types/User';
import { fetchWithToken } from './tokens';

export async function handleLogin(
    lr: LoginResponse,
    dispatchUser: (user: User | null) => void,
): Promise<void> {
    if (lr.count) {
        const { pk, saldo } = lr.results[0];
        dispatchUser({ pk, balance: saldo });
    } else {
        dispatchUser(null);
    }
}

export const login = async (rfid: string) => (await (
    await fetchWithToken(LOGIN_URI(rfid))
).json()) as LoginResponse;
