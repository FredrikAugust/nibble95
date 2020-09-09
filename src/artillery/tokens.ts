import { CLIENT_ID, CLIENT_SECRET, AUTHORIZE_URI } from './API';

const saveToken = (token: string) => localStorage.setItem('n95_token', token);
export const loadToken = (): string => localStorage.getItem('n95_token')!;

export const fetchToken = async (): Promise<void> => {
    const payload = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const response = await fetch(AUTHORIZE_URI, {
        method: 'POST',
        body: payload,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const json = await response.json();
    saveToken(json.access_token as string);
};

export const fetchWithToken = async (url: string, second = false): Promise<Response> => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401 && !second) {
    // token is too old
        await fetchToken();
        const retryResponse = await fetchWithToken(url, true);
        if (retryResponse.status === 401) {
            throw retryResponse;
        }
        return retryResponse;
    }
    return response;
};

export const postWithToken = (url: string, data: any): Promise<Response> => (
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${loadToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
);
