import { Dispatch, SetStateAction } from 'react';
import { LoginResponse, LOGIN_URI, REGISTER_RFID_URI } from './API';
import { User } from '../types/User';
import { fetchWithToken, postWithToken } from './tokens';

export const login = async (rfid: string) => (await (
    await fetchWithToken(LOGIN_URI(rfid))
).json()) as LoginResponse;

export async function handleLogin(
    rfid: string,
    dispatchUser: (user: User | null) => void,
    setRfid: Dispatch<SetStateAction<string>> | undefined = undefined,
): Promise<void> {
    const lr = await login(rfid);
    if (lr.count) {
        const { pk, saldo, first_name } = lr.results[0];
        dispatchUser({ pk, balance: saldo, first_name });
    } else {
        dispatchUser(null);
        if (setRfid) setRfid(rfid);
    }
}

export const registerUser = (username: string, password: string, rfid: string) => {
    const data = {
        username,
        password,
        rfid,
    };
    return postWithToken(REGISTER_RFID_URI, data);
};
