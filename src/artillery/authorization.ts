import { LoginResponse, LOGIN_URI, REGISTER_RFID_URI } from './API';
import { User } from '../types/User';
import { fetchWithToken, postWithToken } from './tokens';

export const login = async (rfid: string) => {
    const response = await fetchWithToken(LOGIN_URI(rfid));
    const json = await response.json();
    return json as LoginResponse;
};

export const handleLogin = async (rfid: string): Promise<User | null> => {
    const user = await login(rfid);
    if (user.count) { // As it returns a weird response
        const { pk, saldo, first_name } = user.results[0]; // The first and only user
        return { pk, balance: saldo, first_name };
    }
    return null;
};

export const registerUser = (username: string, password: string, rfid: string) => {
    const data = {
        username,
        password,
        rfid,
    };
    return postWithToken(REGISTER_RFID_URI, data);
};
