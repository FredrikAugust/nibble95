const CLIENT_ID = encodeURIComponent(process.env.REACT_APP_CLIENT_ID!);
const CLIENT_SECRET = encodeURIComponent(process.env.REACT_APP_CLIENT_SECRET!);
const API_BASE = process.env.REACT_APP_API_BASE!;

const saveToken = (token: string) => localStorage.setItem('n95_token', token);
export const loadToken = (): string => localStorage.getItem('n95_token')!;

export const fetchToken = async (): Promise<void> => {
    const payload = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    saveToken(
    (
      await (
          await fetch(`${API_BASE}/auth/`, {
              method: 'POST',
              body: payload,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          })
      ).json()
    ).access_token as string,
    );
};

export const fetchWithToken = async (
    url: string,
    second = false,
): Promise<Response> => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 401 && !second) {
    // token is too old
        await fetchToken();

        const retryRes = await fetchWithToken(url, true);

        if (retryRes.status === 401) {
            throw retryRes;
        }

        return retryRes;
    }

    return res;
};

export interface LoginResponse {
  count: number;
  next: any;
  previous: any;
  results: Array<{
    pk: number;
    first_name: string;
    last_name: string;
    saldo: number;
  }>;
}

export const login = async (rfid: string) => (await (
    await fetchWithToken(`${API_BASE}/usersaldo/?rfid=${rfid}`)
).json()) as LoginResponse;
